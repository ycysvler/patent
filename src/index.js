import React from 'react';
import { render } from 'react-dom';
import { Router, Route,  hashHistory, IndexRoute } from 'react-router';
import App from './App';
import './index.css';

const routes = (
    <Router history={hashHistory}>
        <Route path="/" component={App}>
        </Route>
    </Router>);
render(routes, document.getElementById('root'));
