/**
 * Created by VLER on 2017/3/10.
 */

import React from 'react';
import {Layout, Breadcrumb, Popover, Button, Row, Col, Input, TreeSelect, Icon, Steps} from 'antd';
import {LocarnoActions, LocarnoStore} from '../locarnoapi';
import CutImage from './cutimage';
import $ from 'jquery';
const {Content} = Layout;
const Step = Steps.Step;

class LocarnoZoneCreate extends React.Component {
    constructor(props) {
        super(props);

        this.unsubscribe = LocarnoStore.listen(this.onStatusChange.bind(this));

        let typeids = window.localStorage["typeIds"] ? window.localStorage["typeIds"].split(',') : [];
        let typeState = window.localStorage["typeIds"] ? true : false;

        this.state = {
            uploadImageList: [],
            description: "",
            typeIds: typeids,
            typeNames: typeids,
            describeState: false,
            typeState: typeState,
            imageState: false,
            typeList: []
        };
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    componentDidMount() {
        LocarnoActions.getAllType(this.getCookie("token"));
        this.refs.inputfile.onchange = this.inputChange.bind(this);
    }

    onStatusChange = (type, data) => {
        if (type === "uploadImage") {
            var uploadImageList = this.state.uploadImageList;
            this.setState({uploadImageList: uploadImageList.concat(data.data), imageState: true});
        } else if (type === "getAllType") {
            this.treeData = data;
            this.setState({typeList: data});
        } else if (type === "create") {
            console.log(this.props);
            this.goToHistorySearch();
        }
    }

    goToHistorySearch() {
        this.props.router.push('/locarno/zone/list');
    }

    getCookie(name) {
        if (window.document.cookie === "") {
            this.context.router.push("/");
            return;
        }
        let cookies = window.document.cookie.split(";");
        if (name === "token") {
            let token = cookies[0].substring(6);
            if (!token || token === "") {
                this.context.router.push("/");
                return;
            } else {
                return token;
            }
        } else if (name === "user_id") {
            let user_id = cookies[1].substring(9);
            if (!user_id || user_id === "") {
                this.context.router.push("/");
                return;
            } else {
                return user_id;
            }
        } else {
            let user_name = cookies[2].substring(11);
            if (!user_name || user_name === "") {
                this.context.router.push("/");
                return;
            } else {
                return user_name;
            }
        }
    }

    inputChange() {
        let self = this;
        let data = new FormData();

        var filenames = [];
        $.each(self.refs.inputfile.files, function (i, file) {
            data.append('upload_file' + i, file);
            filenames.push(file.name);
        });

        LocarnoActions.uploadImage(window.server_address + "/uploadimages.ashx?username=" + this.getCookie("user_name"), data, filenames, this.getCookie("token"));
    }

    checkImage() {
        this.refs.inputfile.click();
    }

    getRandomKeys() {
        let k = Math.random() * 1000000;
        return k;
    }

    setDescribeState(e) {
        if (e.target.value === "") {
            this.setState({describeState: false});
        } else {
            this.setState({describeState: true, description: e.target.value});
        }
    }

    setTypeState(value, label) {
        window.localStorage["typeIds"] = value;
        if (label.length > 0) {
            this.setState({typeState: true, typeIds: value, typeNames: value});
        } else {
            this.setState({typeState: false});
        }
    }

    createNewJob() {
        LocarnoActions.create(this.getCookie("user_id"), this.state.description, this.state.typeIds, this.state.typeNames, this.state.uploadImageList, 2, this.getCookie("token"));
    }

    renderOneImage(url) {
        return <div>
            <img alt="" style={{maxWidth: 500, maxHeight: 500}}
                 src={window.server_address + "/image.ashx?name=" + url}/>
        </div>
    }

    remove(image) {
        console.log(image);
        var imageList = this.state.uploadImageList;
        console.log(imageList);
        imageList.remove(image);
        console.log(imageList);
        this.setState({'uploadImageList': imageList});
    }

    show_parent = TreeSelect.SHOW_PARENT;

    render() {
        let self = this;
        let canSearch = self.state.describeState && self.state.typeState && self.state.imageState;

        return (
            <Layout >
                <div className="breadcrumb">
                    <Breadcrumb style={{margin: '11px 0'}}>
                        <Breadcrumb.Item>局部检索</Breadcrumb.Item>
                        <Breadcrumb.Item style={{cursor: "pointer"}}
                                         onClick={this.goToHistorySearch.bind(this)}>历史查询</Breadcrumb.Item>
                        <Breadcrumb.Item>新建查询</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <Layout >
                    <Content style={{background: "#fff"}}>

                        <div style={{marginTop: "24px"}}>
                            <Row>
                                <Col span="4"/>
                                <Col span="18">

                                    <Steps current={1}>
                                        <Step title="添加基本信息" description={<div>添加查询描述、选择专利所属分类；</div>}/>
                                        <Step title="上传图片" description="选择上传图片."/>
                                        <Step title="图片预处理" description="服务器预处理图片信息."/>
                                        <Step title="拾取区域" description="圈选出局部信息，提交查询."/>
                                    </Steps>
                                </Col>
                            </Row>
                        </div>
                        <br/>
                        <div style={{marginTop: "24px"}}>
                            <Col span="4" style={{"textAlign": "right", "paddingTop": "5px"}}>
                                <span>描述：</span>
                            </Col>
                            <Col span="8">
                                <Input placeholder="查询任务描述信息" onBlur={self.setDescribeState.bind(self)}/>
                            </Col>
                        </div>
                        <br/>
                        <div style={{marginTop: "24px"}}>
                            <Row>
                                <Col span="4" style={{"textAlign": "right", "paddingTop": "5px"}}>
                                    <span>选择分类：</span>
                                </Col>
                                <Col span="8">
                                    <TreeSelect multiple
                                                treeCheckable
                                                value={this.state.typeIds}
                                                treeData={this.state.typeList}
                                                showCheckedStrategy={this.show_parent}
                                                onChange={this.setTypeState.bind(this)}
                                                style={{width: "100%"}}
                                    ></TreeSelect>

                                </Col>
                            </Row>
                        </div>
                        <br/>
                        <div style={{marginTop: "12px"}}>
                            <Row>
                                <Col span="4" style={{"textAlign": "right", "paddingTop": "5px"}}>
                                    <span>选择图像：</span>
                                </Col>
                                <Col span="18">
                                    {
                                        self.state.uploadImageList.map(function (image) {
                                            return <div key={image}
                                                        style={{height: 50, width: 50, marginRight: 8, float: 'left'}}>
                                                <Popover content={self.renderOneImage(image)}>
                                                    <div style={{position: 'relative'}}>

                                                        <img alt="" onClick={self.remove.bind(self, image)} style={{
                                                            maxWidth: "50px",
                                                            maxHeight: "50px",
                                                            cursor: "pointer"
                                                        }}
                                                             src={window.server_address + "/image.ashx?name=" + image}/>
                                                        <Icon type="close-circle"
                                                              style={{position: 'absolute', right: '0px', top: '0px'}}/>

                                                    </div>
                                                </Popover></div>
                                        })
                                    }
                                    <Button icon="plus" onClick={this.checkImage.bind(this)} style={{
                                        height: 50, width: 50, fontSize: 18,
                                        cursor: "pointer"
                                    }}>
                                    </Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="4" style={{"textAlign": "right", "paddingTop": "5px"}}>
                                <span>拾取区域：</span>
                                </Col>
                                <Col span="20">
                                    <CutImage />
                                </Col>
                            </Row>
                            <input multiple="multiple" ref="inputfile" type="file" accept=""
                                   style={{display: "none"}}/>
                        </div>
                        <div style={{position: "relative", marginTop: 24}}>
                            <Col span="4">
                                <span></span>
                            </Col>
                            <Col span="8">


                                <Button type="primary" onClick={self.createNewJob.bind(self)}
                                        disabled={!canSearch}>查询</Button>
                                <Button style={{marginLeft: 8}} onClick={self.props.back}>取消</Button>
                            </Col>
                        </div>
                        <br/>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default LocarnoZoneCreate;