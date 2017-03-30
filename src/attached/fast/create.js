/**
 * Created by VLER on 2017/3/10.
 */
import React from 'react';
import {Layout, Menu, Breadcrumb, Icon, Button,Col,Input,TreeSelect} from 'antd';
import $ from 'jquery';
import {FastActions,FastStore} from './fastApi.js';
const {SubMenu} = Menu;
const {Header, Content, Sider} = Layout;

class AttachedFastCreate extends React.Component {
    constructor(props) {
        super(props);
        this.unsubscribe = FastStore.listen(this.onStateChange.bind(this));
        this.state = {
            uploadImageList:[],
            discribeState:false,
            typeState:false,
            imageState:false,
        };
    }
    static contextTypes = {
        router: React.PropTypes.object.isRequired,
    };
    componentDidMount() {
        this.refs.inputfile.onchange = this.inputChange.bind(this);
    }
    componentWillUnmount() {
        this.unsubscribe();
    }
    onStateChange(type,data) {
        if(type == "uploadImage") {
            this.state.imageState = true;
            this.setState({uploadImageList:data.images});
        }
    }
    goToHistorySearch() {
        this.context.router.push("/attached/fast/list");
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
        FastActions.uploadImage(window.server_address + "/uploadimages.ashx?username=admin",data,file);
    }
    checkImage() {
        this.refs.inputfile.click();
    }
    show_parent = TreeSelect.SHOW_PARENT;
    getRandomKeys() {
        let k = Math.random()*1000000;
        return k;
    }
    setDiscribeState(e) {
        if(e.target.value == "") {
            this.setState({discribeState:false});
        } else {
            this.setState({discribeState:true});
        }
    }
    setTypeState(value,label) {
        if(label.length > 0) {
            this.setState({typeState:true});
        } else {
            this.setState({typeState:false});
        }
    }
    render() {

        let self = this;
        let canSearch = self.state.discribeState && self.state.typeState && self.state.imageState;
        console.log(canSearch);
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
                                <Input placeholder="Q2017.03.23_032" onBlur={self.setDiscribeState.bind(self)} />
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
                        <div style={{marginTop:"100px"}}>
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
                        <div style={{marginTop:"100px"}}>
                            <Col span="4" >
                                <span></span>
                            </Col>
                            <Col span="8">
                                <Button type="primary" className="create_search_btn" disabled={!canSearch}>查询</Button><Button style={{marginLeft:"10px"}} >取消</Button>
                            </Col>
                        </div><br/>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default AttachedFastCreate;
