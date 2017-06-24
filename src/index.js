import React from 'react';
import {render} from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
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
            <Route path="/attached/fast/list" component={AttachedFastList}/>
            {/*新建快速查询*/}
            <Route path="/attached/fast/create" component={AttachedFastCreate}/>
            {/*快速检索结果*/}
            <Route path="/attached/fast/details" component={AttachedFastDetails}/>

            {/*附图.高级检索.历史查询*/}
            <Route path="/attached/senior/list" component={AttachedSeniorList}/>
            {/*新建高级查询*/}
            <Route path="/attached/senior/create" component={AttachedSeniorCreate}/>
            {/*高级检索结果*/}
            <Route path="/attached/senior/details" component={AttachedSeniorDetails}/>

            {/*附图.局部检索.历史查询*/}
            <Route path="/attached/zone/list" component={AttachedZoneList}/>
            {/*新建局部查询*/}
            <Route path="/attached/zone/create" component={AttachedZoneCreate}/>
            {/*局部检索结果*/}
            <Route path="/attached/zone/details" component={AttachedZoneDetails}/>
            {/*专利信息详情*/}
            <Route path="/attached/patent/details/:id" component={AttachedPatentDetails}/>


            {/*外观.快速检索.历史查询*/}
            <Route path="/locarno/fast/list" component={LocarnoFastList}/>
            {/*新建快速查询*/}
            <Route path="/locarno/fast/create" component={LocarnoFastCreate}/>
            {/*快速检索结果*/}
            <Route path="/locarno/fast/details" component={LocarnoFastDetails}/>

            {/*外观.高级检索.历史查询*/}
            <Route path="/locarno/senior/list" component={LocarnoSeniorList}/>
            {/*新建高级查询*/}
            <Route path="/locarno/senior/create" component={LocarnoSeniorCreate}/>
            {/*快速高级结果*/}
            <Route path="/locarno/senior/details" component={LocarnoSeniorDetails}/>

            {/*外观.局部检索.历史查询*/}
            <Route path="/locarno/zone/list" component={LocarnoZoneList}/>
            {/*新建局部查询*/}
            <Route path="/locarno/zone/create" component={LocarnoZoneCreate}/>
            {/*快速局部结果*/}
            <Route path="/locarno/zone/details" component={LocarnoZoneDetails}/>

            {/*快速局部结果*/}
            <Route path="/tools/imageinfo" component={ImageInfo}/>
        </Route>
        {/*无此页面，转到登录*/}
        <Route path="*" component={Login}/>
    </Router>);
render(routes, document.getElementById('root'));