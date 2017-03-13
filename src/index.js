import React from 'react';
import {render} from 'react-dom';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';
import App from './App';

import Login from './login.js';
import Welcome from './welcome.js';

import UserList from './system/user/list.js';
import RoleList from './system/role/list.js';
import ResourceList from './system/resource/list.js';
import LogList from './system/log/list.js';

import AttachedFastList from './attached/fast/list.js';
import AttachedFastCreate from './attached/fast/create.js';
import AttachedFastDetails from './attached/fast/details.js';

import AttachedSeniorList from './attached/senior/list.js';
import AttachedSeniorCreate from './attached/senior/create.js';
import AttachedSeniorDetails from './attached/senior/details.js';

import 'antd/dist/antd.css';
import './styles/base.less';
import './styles/index.css';

const routes = (
    <Router history={hashHistory}>
        {/*登陆页*/}
        <Route path="/" component={Login}></Route>
        <Route path="/main" component={App}>
            {/*欢迎页*/}
            <Route path="/welcome" component={Welcome}/>
            {/*用户管理*/}
            <Route path="/system/users" component={UserList}/>
            {/*角色管理*/}
            <Route path="/system/roles" component={RoleList}/>
            {/*资源管理*/}
            <Route path="/system/resources" component={ResourceList}/>
            {/*日志查询*/}
            <Route path="/system/logs" component={LogList}/>

            {/*附图.快速检索.历史查询*/}
            <Route path="/attached/fast" component={AttachedFastList}/>
            {/*新建快速查询*/}
            <Route path="/attached/create" component={AttachedFastCreate}/>
            {/*快速检索结果*/}
            <Route path="/attached/details" component={AttachedFastDetails}/>

            {/*附图.高级检索.历史查询*/}
            <Route path="/senior/fast" component={AttachedSeniorList}/>
            {/*新建快速查询*/}
            <Route path="/senior/create" component={AttachedSeniorCreate}/>
            {/*快速检索结果*/}
            <Route path="/senior/details" component={AttachedSeniorDetails}/>

            AttachedFastDetails
        </Route>
        {/*无此页面，转到登录*/}
        <Route path="*" component={Login}/>
    </Router>);
render(routes, document.getElementById('root'));