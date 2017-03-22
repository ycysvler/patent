/**
 * Created by VLER on 2017/3/10.
 */
import React from 'react';
import {Layout, Menu, Breadcrumb, Icon, Button,Input} from 'antd';
import './fast.css'
const {SubMenu} = Menu;
const {Header, Content, Sider} = Layout;

class AttachedFastList extends React.Component {
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
                            <span className="fast-check-num"><Icon style={{"marginRight":"6px","color":"blue"}} type="info-circle" />已选择5项数据</span>
                            <Button className="fast-search-btn" >搜索</Button>
                            <Input style={{"width":"20%","position":"relative","float":"right","marginRight":"5px"}}  placeholder="请输入描述关键词" />
                        </div>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default AttachedFastList;
