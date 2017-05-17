import React from 'react';
import {render} from 'react-dom';
import {Router, Route, IndexRoute, BrowserRouter, Switch} from 'react-router-dom';

import Header from './components/Header';
import Application from './views/Application';
import Login from './components/Login';

require('../css/styles.less');

var viewportWidth = Math.max(
    document.documentElement.clientWidth,
    window.innerWidth || 0
);

var Wrapper = (props) => {
    var pathname = props.location.pathname;
    var search = props.location.search;
    var fetchMethod;

    // resolve fetchMethod from pathname
    if(pathname == '/') {
        fetchMethod = 'haku';
    } else {
        fetchMethod = pathname.match(/haku|suosikit|viimeisimmat/g)[0];
    }

    // set which food item is to be searched for
    // defaults to maitorahka if no query params are present
    if(!search) {
        search = 'maitorahka';
    } else {
        search = search.split('=')[1];
    }

    return (
        <Application
            viewportWidth={viewportWidth}
            fetchMethod={fetchMethod}
            search={search}
        />
    );
}


render(
    <BrowserRouter>
        <div className='container-fluid'>
            <Header viewportWidth={viewportWidth} />
            <Route exact path='/' render={Wrapper} />
            <Route exact path='/haku' render={Wrapper} />
            <Route exact path='/suosikit' render={Wrapper} />
            <Route exact path='/viimeisimmat' render={Wrapper} />
        </div>
    </BrowserRouter>,
    document.getElementById('app')
);
