/**
 * Created by VLER on 2017/3/10.
 */
import React from 'react';
import {Layout,  Breadcrumb, Icon, Button,Col,Input,TreeSelect} from 'antd';
import $ from 'jquery';
import {FastActions,FastStore} from './fastApi.js';

const { Content } = Layout;

class AttachedFastCreate extends React.Component {
    constructor(props) {
        super(props);
        this.unsubscribe = FastStore.listen(this.onStatusChange.bind(this));
        this.state = {
            uploadImageList:[],
            description:"",
            typeIds:[],
            typeNames:[],
            describeState:false,
            typeState:false,
            imageState:false,
            typeList:[]
        };
    }
    static contextTypes = {
        router: React.PropTypes.object.isRequired,
    };
    componentDidMount() {
        FastActions.getAllType(this.getCookie("token"));
        this.refs.inputfile.onchange = this.inputChange.bind(this);
    }
    componentWillUnmount() {
        this.unsubscribe();
    }
    onStatusChange(type,data) {
        if(type === "uploadImage") {
            this.setState({uploadImageList:data.images, imageState:true});

            console.log(data.images);
        } else if(type === "getAllType") {
            this.treeData = data;
            this.setState({typeList:data});
        } else if(type === "create") {
            console.log(data);
        }
    }
    goToHistorySearch() {
        this.context.router.push("/attached/fast/list");
    }
    getCookie(name) {
        if(window.document.cookie === "") {
            this.context.router.push("/");
            return;
        }
        let cookies = window.document.cookie.split(";");
        if(name === "token") {
            let token = cookies[0].substring(6);
            if(!token || token === "") {
                this.context.router.push("/");
                return;
            } else {
                return token;
            }
        } else if(name === "user_id") {
            let user_id = cookies[1].substring(9);
            if(!user_id || user_id === "") {
                this.context.router.push("/");
                return;
            } else {
                return user_id;
            }
        } else {
            let user_name = cookies[2].substring(11);
            if(!user_name || user_name === "") {
                this.context.router.push("/");
                return;
            } else {
                return user_name;
            }
        }
    }
    treeData = [{
        label:'HB0',
        value:'0-0',
        key:'0-0',
        children:[{
            label:'HB01031',
            value:'0-0-0',
            key:'0-0-0',
            children:[{
                label:'HB0103120',
                value:'0-0-0-0',
                key:'0-0-0-0'
            }, {
                label:'HB0103121',
                value:'0-0-0-1',
                key:'0-0-0-1'
            }, {
                label:'HB0103122',
                value:'0-0-0-2',
                key:'0-0-0-2'
            }, {
                label:'HB0103123',
                value:'0-0-0-3',
                key:'0-0-0-3'
            }]
        }]
    }, {
        label:'HB1',
        value:'0-1',
        key:'0-1'
    }]
    inputChange() {
        let self = this;
        let data = new FormData();
        $.each(self.refs.inputfile.files, function (i, file) {
            data.append('upload_file' + i, file);
        });
        let file = {name:'aaa.jpg'};
        FastActions.uploadImage(window.server_address + "/uploadimages.ashx?username="+this.getCookie("user_name"),data,file,this.getCookie("token"));
    }
    checkImage() {
        this.refs.inputfile.click();
    }
    show_parent = TreeSelect.SHOW_PARENT;
    getRandomKeys() {
        let k = Math.random()*1000000;
        return k;
    }
    setDescribeState(e) {
        if(e.target.value === "") {
            this.setState({describeState:false});
        } else {
            this.state.description = e.target.value;
            this.setState({describeState:true});
        }
    }
    setTypeState(value,label) {
        if(label.length > 0) {
            this.state.typeIds = label;
            this.state.typeNames = label;
            this.setState({typeState:true});
        } else {
            this.setState({typeState:false});
        }
    }
    createNewJob() {
        FastActions.create(this.getCookie("user_id"),this.state.description,this.state.typeIds,this.state.typeNames,this.state.uploadImageList,this.getCookie("token"));
    }
    render() {
        let self = this;
        let canSearch = self.state.describeState && self.state.typeState && self.state.imageState;
        return (
            <Layout >
                <div className="breadcrumb">
                    <Breadcrumb style={{margin: '11px 0'}}>
                        <Breadcrumb.Item>快速检索</Breadcrumb.Item>
                        <Breadcrumb.Item style={{cursor:"pointer"}} onClick={this.goToHistorySearch.bind(this)}>历史查询</Breadcrumb.Item>
                        <Breadcrumb.Item>新建查询</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <Layout className="content">
                    <Content style={{border:"1px solid #cccccc"}}>
                        <div style={{marginTop:"24px"}}>
                            <Col span="4" style={{"textAlign":"right","paddingTop":"5px"}}>
                                <span>描述：</span>
                            </Col>
                            <Col span="8">
                                <Input placeholder="Q2017.03.23_032" onBlur={self.setDescribeState.bind(self)} />
                            </Col>
                        </div><br/>
                        <div style={{marginTop:"24px"}}>
                            <Col span="4" style={{"textAlign":"right","paddingTop":"5px"}}>
                                <span>选择分类：</span>
                            </Col>
                            <Col span="8">
                                <TreeSelect multiple
                                            treeCheckable
                                            treeData={this.treeData}
                                            showCheckedStrategy={this.show_parent}
                                            onChange={this.setTypeState.bind(this)}
                                            style={{width:"100%"}}
                                ></TreeSelect>
                            </Col>
                        </div><br/>
                        <div style={{marginTop:"230px"}}>
                            <Col span="4" style={{"textAlign":"right","paddingTop":"5px"}}>
                                <span>选择图像：</span>
                            </Col>
                            <Col span="8">
                                {
                                    self.state.uploadImageList.map(function(image) {
                                        return <img key={self.getRandomKeys} style={{width:"50px",height:"50px"}} src={window.server_address+"/"+image} />
                                    })
                                }
                                <Icon onClick={this.checkImage.bind(this)} style={{width:"50px",height:"50px",fontSize:"55px",cursor:"pointer"}} type="plus-square-o" />
                                <input multiple="multiple" ref="inputfile" type="file" accept="" style={{display:"none"}}/>
                            </Col>
                        </div><br/>
                        <div style={{position:"relative",marginTop:"100px"}}>
                            <Col span="4" >
                                <span></span>
                            </Col>
                            <Col span="8">
                                <span><Button type="primary" className="create_search_btn" onClick={self.createNewJob.bind(self)} disabled={!canSearch}>查询</Button><Button style={{marginLeft:"10px"}} >取消</Button></span>
                            </Col>
                        </div><br/>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default AttachedFastCreate;
