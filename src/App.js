import React from 'react';
import {Layout, Menu, Breadcrumb, Icon, Button} from 'antd';
import Reflux from 'reflux';
import {IndexActions, IndexStore} from './api.js';
import { Link} from 'react-router';
const {SubMenu} = Menu;
const {Header, Content, Sider} = Layout;

import './styles/app.css';

const App = React.createClass({
    mixins:[Reflux.listenTo(IndexStore,'onStatusChange')],
    getInitialState: function () {
        return {"indexList": [],"leftIndex": []};
    },
    componentDidMount: function () {
        IndexActions.getIndexes(1132);
    },
    onStatusChange: function(data) {
        console.log(data);
        this.setState({indexList:data.data});
        this.setState({leftIndex:data.data[0].children});
    },
    onClickHandler: function(e) {
        for(let i=0;i<this.state.indexList.length;i++) {
            if(this.state.indexList[i].rid == e.key) {
                this.setState({leftIndex:this.state.indexList[i].children});
                return;
            }
        }
    },
    render() {
        let lIndexs = this.state.leftIndex;
        let index_list = this.state.indexList;
        console.log(lIndexs,index_list);
        return (
            <Layout className="app-root">
                <Header style={{background: '#3f3f3f'}}>
                    <div className="logo"/>
                    <div style={{float: 'right'}}>
                        <Layout style={{"background":"#3f3f3f"}}>
                            <Content>
                                <Menu
                                    theme="dark"
                                    mode="horizontal"
                                    style={{lineHeight: '64px'}}
                                    onClick={this.onClickHandler}
                                    >
                                    {
                                        index_list.map(function(index) {
                                            return <Menu.Item key={index.rid}>{index.rname}</Menu.Item>
                                        })
                                    }
                                </Menu></Content>
                            <Sider width={160} className="box"
                                   style={{background: '#3f3f3f', height: '64px', justifyContent: 'flex-end'}}>
                                <Button style={{"background":"#3f3f3f","border":"none"}} icon="question-circle-o" size="small" className="header-help">帮助</Button>
                                <div className="icon"></div>
                            </Sider>
                        </Layout>
                    </div>
                </Header>
                <Layout>
                    <Sider width={250} style={{background: '#cccccc'}}>
                        <Menu
                            mode="inline"
                            >
                            {
                                lIndexs.map(function(lIndex) {
                                    if(lIndex.children.length > 0) {
                                        return <SubMenu key={lIndex.rid} title={<span>{lIndex.rname}</span>}>
                                            {
                                                lIndex.children.map(function(i){
                                                    return <Menu.Item key={i.rid}>{i.rname}</Menu.Item>
                                                })
                                            }
                                        </SubMenu>
                                    } else {
                                        return <Menu.Item key={lIndex.rid}>{lIndex.rname}</Menu.Item>
                                    }
                                })
                            }
                        </Menu>
                    </Sider>
                    <Layout >

                        {this.props.children}

                    </Layout>
                </Layout>
            </Layout>
        );
    }
});

export default App;
