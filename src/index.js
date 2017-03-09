import React from 'react';
import { render } from 'react-dom';
import { Router, Route,  hashHistory } from 'react-router';
import App from './App';

import UserList from './system/user/list.js';

import 'antd/dist/antd.css';
import './styles/base.less';
import './styles/index.css';

const routes = (
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <Route path="/system/users" component={UserList} />
        </Route>
        <Route path="/login" component={App}>
        </Route>
    </Router>);
render(routes, document.getElementById('root'));
