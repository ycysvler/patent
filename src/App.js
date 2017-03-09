import React from 'react';
import {Layout, Menu, Breadcrumb, Icon, Button} from 'antd';
const {SubMenu} = Menu;
const {Header, Content, Sider} = Layout;

import './styles/app.css';

class App extends React.Component {
    render() {
        return (
            <Layout className="app-root">
                <Header style={{background: '#fff'}}>
                    <div className="logo"/>
                    <div style={{float: 'right'}}>
                        <Layout>
                            <Content>
                        <Menu
                            mode="horizontal"
                            defaultSelectedKeys={['7']}
                            style={{lineHeight: '64px'}}
                        >
                            <Menu.Item key="1">专利检索</Menu.Item>
                            <Menu.Item key="2">其他检索</Menu.Item>
                            <Menu.Item key="3">辅助工具</Menu.Item>
                            <Menu.Item key="4">统计分析</Menu.Item>
                            <Menu.Item key="5">系统监控</Menu.Item>
                            <Menu.Item key="6">数据管理</Menu.Item>
                            <Menu.Item key="7">系统管理</Menu.Item>
                        </Menu></Content>
                            <Sider width={160} className="box" style={{background: '#fff',height:'64px', justifyContent: 'flex-end'}}>
                        <Button icon="question-circle-o" size="small" className="header-help">帮助</Button>
                            <div className="icon"></div>
                            </Sider>
                        </Layout>
                    </div>
                </Header>
                <Layout>
                    <Sider width={250} style={{background: '#fff'}}>
                        <Menu
                            theme="dark"
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{height: '100%'}}
                        >
                            <SubMenu key="sub1" title={<span><Icon type="user"/>subnav 1</span>}>
                                <Menu.Item key="1">option1</Menu.Item>
                                <Menu.Item key="2">option2</Menu.Item>
                                <Menu.Item key="3">option3</Menu.Item>
                                <Menu.Item key="4">option4</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub2" title={<span><Icon type="laptop"/>subnav 2</span>}>
                                <Menu.Item key="5">option5</Menu.Item>
                                <Menu.Item key="6">option6</Menu.Item>
                                <Menu.Item key="7">option7</Menu.Item>
                                <Menu.Item key="8">option8</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub3" title={<span><Icon type="notification"/>subnav 3</span>}>
                                <Menu.Item key="9">option9</Menu.Item>
                                <Menu.Item key="10">option10</Menu.Item>
                                <Menu.Item key="11">option11</Menu.Item>
                                <Menu.Item key="12">option12</Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Layout >

                            {this.props.children}

                    </Layout>
                </Layout>
            </Layout>
        );
    }
}

export default App;
