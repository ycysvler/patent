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

            LogList

        </Route>
        {/*无此页面，转到登录*/}
        <Route path="*" component={Login} />
    </Router>);
render(routes, document.getElementById('root'));