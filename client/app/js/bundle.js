import React from 'react';
import {render} from 'react-dom';
import {Router, Route, IndexRoute, BrowserRouter, Redirect} from 'react-router-dom';

import Header from './components/Header/Header';
import CurrentEntryWrapper from './views/CurrentEntryWrapper';
import DiaryWrapper from './views/DiaryWrapper';
import getCurrentDate from './util/get-current-date';

require('../css/styles.less');

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
