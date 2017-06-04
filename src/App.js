import React from 'react';
import {Layout, Menu, Button} from 'antd';
import Reflux from 'reflux';
import {Link} from 'react-router';
import {IndexActions, IndexStore} from './api.js';

const {SubMenu} = Menu;
const {Header, Content, Sider} = Layout;

import './styles/app.css';

const App = React.createClass({
    mixins: [Reflux.listenTo(IndexStore, 'onStatusChange')],
    getInitialState: function () {
        return {"indexList": [], "leftIndex": []};
    },
    componentDidMount: function () {
        IndexActions.getIndexes(this.getCookie("user_id"),this.getCookie("token"));
    },
    onStatusChange: function (action, result) {
        // 判断一下action,当同一个Store多个不同的方法发出trigger时好区分是谁发的
        if (action === 'getIndexes') {
            this.setState({indexList: result.data});
            this.setState({leftIndex: result.data[0].children});
        }
    },
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
    },
    contextTypes: {
        // 这个是为了使用js代码跳转页面使用的
        router: React.PropTypes.object
    },
    onClickHandler: function (e) {
        for (let i = 0; i < this.state.indexList.length; i++) {
            if (this.state.indexList[i].rid === e.key) {
                this.setState({leftIndex: this.state.indexList[i].children});
                return;
            }
        }
    },
    render() {
        let lIndexs = this.state.leftIndex;
        let index_list = this.state.indexList;
        return (
            <Layout className="app-root">
                <Header style={{background: '#fff'}}>
                    <div className="logo"/>
                    <div style={{float: 'right'}}>
                        <Layout style={{"background": "white"}}>
                            <Content>
                                <Menu mode="horizontal"
                                    style={{lineHeight: '63px'}}
                                    onClick={this.onClickHandler}
                                >
                                    {
                                        index_list.map(function (index) {
                                            return <Menu.Item key={index.rid}>{index.rname}</Menu.Item>
                                        })
                                    }
                                </Menu>
                            </Content>

                            <Sider width={160} className="box"
                                   style={{background: '#fff', height: '64px', justifyContent: 'flex-end'}}>
                                <Button style={{"background": "#fff", "border": "none"}} icon="question-circle-o"
                                        size="small" className="header-help">帮助</Button>
                                <div className="icon"></div>
                            </Sider>

                        </Layout>
                    </div>
                </Header>

                <Layout>
                    <Sider width={250} >
                        <Menu theme="dark"
                            mode="inline"
                        >
                            {
                                lIndexs.map(function (lIndex) {
                                    if (lIndex.children.length > 0) {
                                        return <SubMenu key={lIndex.rid} title={<span>{lIndex.rname}</span>}>
                                            {
                                                lIndex.children.map(function (i) {
                                                    return <Menu.Item key={i.rid}><Link to={i.url}>{i.rname }</Link></Menu.Item>
                                                })
                                            }
                                        </SubMenu>
                                    } else {
                                        return <Menu.Item key={lIndex.rid}><Link to={lIndex.url}>{lIndex.rname }</Link></Menu.Item>
                                    }
                                })
                            }
                        </Menu>
                    </Sider>
                    <Layout>
                        {this.props.children}
                    </Layout>
                </Layout>
            </Layout>
        );
    }
});

export default App;
