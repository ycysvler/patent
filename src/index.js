import React from 'react';
import {render} from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import App from './App';

import Login from './login.js';
import Welcome from './welcome.js';

import UserList from './system/user/list.js';
import UserCreate from './system/user/create.js';
import RoleCreate from './system/role/create.js';
import MapRoleMenu from './system/role/map_role_menu.js';
import RoleList from './system/role/list.js';
import MapRoleUser from './system/role/map_role_user.js';




import LogList from './system/log/list.js';

import AttachedFastList from './attached/fast/list.js';
import AttachedFastCreate from './attached/fast/create.js';
import AttachedFastDetails from './attached/fast/details.js';

import AttachedSeniorList from './attached/senior/list.js';
import AttachedSeniorCreate from './attached/senior/create.js';
import AttachedSeniorDetails from './attached/senior/details.js';

import AttachedZoneList from './attached/zone/list.js';
import AttachedZoneCreate from './attached/zone/create.js';
import AttachedZoneDetails from './attached/zone/details.js';

import AttachedPatentDetails from './attached/patent/details.js';

import LocarnoFastList from './locarno/fast/list.js';
import LocarnoFastCreate from './locarno/fast/create.js';
import LocarnoFastDetails from './locarno/fast/details.js';

import LocarnoSeniorList from './locarno/senior/list.js';
import LocarnoSeniorCreate from './locarno/senior/create.js';
import LocarnoSeniorDetails from './locarno/senior/details.js';

import LocarnoZoneList from './locarno/zone/list.js';
import LocarnoZoneCreate from './locarno/zone/create.js';
import LocarnoZoneDetails from './locarno/zone/details.js';

import ImageInfo from './tools/imageinfo/index.js';

import {IndexStore} from './api.js';

import 'antd/dist/antd.css';
import './styles/base.less';
import './styles/index.css';

const requireAuth = (nextState, replace) => {
    // 未登录，重新登录
    if (IndexStore.cuttentUser === null) {
        //replace({ pathname: '/' })
    }
}

const routes = (
    <Router history={hashHistory}>
        {/*登陆页*/}
        <Route path="/" component={Login}></Route>
        <Route path="/main" component={App}>
            {/*欢迎页*/}
            <Route path="/welcome" component={Welcome} onEnter={requireAuth}/>
            {/*用户管理*/}
            <Route path="/system/users" component={UserList} onEnter={requireAuth}/>

            <Route path="/system/users/create" component={UserCreate} onEnter={requireAuth}/>
            {/*角色管理*/}
            <Route path="/system/roles" component={RoleList} onEnter={requireAuth}/>
            <Route path="/system/roles/:id/user" component={MapRoleUser} onEnter={requireAuth}/>
            <Route path="/system/roles/:id/menu" component={MapRoleMenu} onEnter={requireAuth}/>
            <Route path="/system/roles/create" component={RoleCreate} onEnter={requireAuth}/>


            {/*日志查询*/}
            <Route path="/system/logs" component={LogList} onEnter={requireAuth}/>

            {/*附图.快速检索.历史查询*/}
            <Route path="/attached/fast/list" component={AttachedFastList} onEnter={requireAuth}/>
            {/*新建快速查询*/}
            <Route path="/attached/fast/create" component={AttachedFastCreate} onEnter={requireAuth}/>
            {/*快速检索结果*/}
            <Route path="/attached/fast/details" component={AttachedFastDetails} onEnter={requireAuth}/>

            {/*附图.高级检索.历史查询*/}
            <Route path="/attached/senior/list" component={AttachedSeniorList} onEnter={requireAuth}/>
            {/*新建高级查询*/}
            <Route path="/attached/senior/create" component={AttachedSeniorCreate} onEnter={requireAuth}/>
            {/*高级检索结果*/}
            <Route path="/attached/senior/details" component={AttachedSeniorDetails} onEnter={requireAuth}/>

            {/*附图.局部检索.历史查询*/}
            <Route path="/attached/zone/list" component={AttachedZoneList} onEnter={requireAuth}/>
            {/*新建局部查询*/}
            <Route path="/attached/zone/create" component={AttachedZoneCreate} onEnter={requireAuth}/>
            {/*局部检索结果*/}
            <Route path="/attached/zone/details" component={AttachedZoneDetails} onEnter={requireAuth}/>
            {/*专利信息详情*/}
            <Route path="/attached/patent/details/:id" component={AttachedPatentDetails} onEnter={requireAuth}/>


            {/*外观.快速检索.历史查询*/}
            <Route path="/locarno/fast/list" component={LocarnoFastList} onEnter={requireAuth}/>
            {/*新建快速查询*/}
            <Route path="/locarno/fast/create" component={LocarnoFastCreate} onEnter={requireAuth}/>
            {/*快速检索结果*/}
            <Route path="/locarno/fast/details" component={LocarnoFastDetails} onEnter={requireAuth}/>

            {/*外观.高级检索.历史查询*/}
            <Route path="/locarno/senior/list" component={LocarnoSeniorList} onEnter={requireAuth}/>
            {/*新建高级查询*/}
            <Route path="/locarno/senior/create" component={LocarnoSeniorCreate} onEnter={requireAuth}/>
            {/*快速高级结果*/}
            <Route path="/locarno/senior/details" component={LocarnoSeniorDetails} onEnter={requireAuth}/>

            {/*外观.局部检索.历史查询*/}
            <Route path="/locarno/zone/list" component={LocarnoZoneList} onEnter={requireAuth}/>
            {/*新建局部查询*/}
            <Route path="/locarno/zone/create" component={LocarnoZoneCreate} onEnter={requireAuth}/>
            {/*快速局部结果*/}
            <Route path="/locarno/zone/details" component={LocarnoZoneDetails} onEnter={requireAuth}/>

            {/*快速局部结果*/}
            <Route path="/tools/imageinfo" component={ImageInfo} onEnter={requireAuth}/>
        </Route>
        {/*无此页面，转到登录*/}
        <Route path="*" component={Login}/>
    </Router>);
render(routes, document.getElementById('root'));