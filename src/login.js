import React from 'react';
import {Layout, Menu, Breadcrumb, Icon, Button} from 'antd';
const {SubMenu} = Menu;
const {Header, Content, Sider} = Layout;


class Login extends React.Component {
    render() {
        return (
            <Layout className="app-root">
                <Header style={{background: '#fff'}}>
                    <div className="logo"/>
                    <div style={{float: 'right'}}>
                        <Layout>
                            <Content>
                            </Content>
                        </Layout>
                    </div>
                </Header>
                <Layout>
                    <Layout >
                        Login
                    </Layout>
                </Layout>
            </Layout>
        );
    }
}

export default Login;
