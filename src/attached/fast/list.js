/**
 * Created by VLER on 2017/3/10.
 */
import React from 'react';
import {Layout, Menu, Breadcrumb, Icon, Button,Input,Table } from 'antd';
import './fast.css'
const {SubMenu} = Menu;
const {Header, Content, Sider} = Layout;

class AttachedFastList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectNum:0
        }
    }
    columns = [{
        title:'描述',
        dataIndex:'describe',
        render(text,record) {
            return <span><a href="javascritp:void(0);">{record.discribe}</a></span>
        }
    }, {
        title:'图像',
        dataIndex:'imageUrl',
        render(text,record) {
            return <span><image src={record.imageUrl}></image></span>
        }
    }, {
        title:'类型',
        dataIndex:'type'
    }, {
        title:'进度',
        dataIndex:'schedule'
    }, {
        title:'创建日期',
        dataIndex:'createDate'
    }, {
        title:'完成时间',
        dataIndex:'doneDate'
    }]

    data = [{
        key:1,
        discribe:"Q2017.03.02_003",
        imageUrl:"./alasijia.jpg",
        type:"HB0132",
        schedule:"54%",
        createDate:"2016-03-24 12:34:56",
        doneDate:"2016-03-24 12:35:12"
    },{
        key:2,
        discribe:"Q2017.03.02_003",
        imageUrl:"./alasijia.jpg",
        type:"HB0132",
        schedule:"54%",
        createDate:"2016-03-24 12:34:56",
        doneDate:"2016-03-24 12:35:12"
    }, {
        key:3,
        discribe:"Q2017.03.02_003",
        imageUrl:"./alasijia.jpg",
        type:"HB0132",
        schedule:"54%",
        createDate:"2016-03-24 12:34:56",
        doneDate:"2016-03-24 12:35:12"
    }]

    rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            this.setState({selectNum:selectedRowKeys.length});
        }
    }
    render() {
        return (
            <Layout >
                <div className="breadcrumb">
                    <Breadcrumb style={{margin: '11px 0'}}>
                        <Breadcrumb.Item>快速检索</Breadcrumb.Item>
                        <Breadcrumb.Item>历史查询</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <Layout className="content">
                    <Content >
                        <div>
                            <Button className="fast-delete-btn" >删除</Button>
                            <Button className="fast-new-search-btn" >新建查询</Button>
                            <span className="fast-check-num"><Icon style={{"marginRight":"6px","color":"blue"}} type="info-circle" />已选择{this.state.selectNum}项数据</span>
                            <Button className="fast-search-btn" >搜索</Button>
                            <Input style={{"width":"20%","position":"relative","float":"right","marginRight":"5px"}}  placeholder="请输入描述关键词" />
                        </div>
                        <Table style={{marginTop:"20px"}} rowSelection={this.rowSelection} columns={this.columns} dataSource={this.data} bordered />
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default AttachedFastList;
