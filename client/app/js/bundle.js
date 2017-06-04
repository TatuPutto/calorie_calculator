import React from 'react';
import {render} from 'react-dom';
import {Router, Route, IndexRoute, BrowserRouter, Redirect} from 'react-router-dom';

import Header from './components/Header';
import CurrentEntry from './views/CurrentEntry';
import Diary from './views/Diary';

import getCurrentDate from './util/get-current-date';

require('../css/styles.less');

var viewportWidth = Math.max(
    document.documentElement.clientWidth,
    window.innerWidth || 0
);

function CurrentEntryWrapper(props) {
    var pathname = props.location.pathname;
    var search = props.location.search;
    var fetchMethod;

    // resolve fetchMethod from pathname
    if(pathname == '/current-entry') {
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
        <CurrentEntry
            viewportWidth={viewportWidth}
            fetchMethod={fetchMethod}
            search={search}
        />
    );
}

function DiaryWrapper(props) {
    var activeEntryDate = null;
    if(props.location.search) {
        activeEntryDate = props.location.search.split('=')[1];
    } else {
        activeEntryDate = getCurrentDate();
    }

    return (
        <Diary viewportWidth={viewportWidth} activeEntryDate={activeEntryDate} />
    );
}

render(
    <BrowserRouter>
        <div className='container-fluid'>
            <Header />
            <Route exact path='/' component={CurrentEntryWrapper} />
            <Route exact path='/current-entry' component={CurrentEntryWrapper} />
            <Route exact path='/diary' component={DiaryWrapper} />
        </div>
    </BrowserRouter>,
    document.getElementById('app')
);
