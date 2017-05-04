import React from 'react';
import {render} from 'react-dom';
import {Router, Route, IndexRoute, BrowserRouter, Switch} from 'react-router-dom';

import Header from './components/Header';
import Application from './components/Application';
import Login from './components/Login';

require('../css/styles.css');

render(
    <BrowserRouter>
        <div>
            <Header />
            <Route exact path='/login' component={Login} />
            <Route exact path='/' component={Application} />

        </div>
    </BrowserRouter>,
    document.getElementById('app')
);
