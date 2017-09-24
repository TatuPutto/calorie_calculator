import React from 'react';

import NavMenu from './NavMenu';
import UserInfo from './UserInfo';

import {checkStatus, readJson, get} from '../util/fetch';

var viewportWidth = Math.max(
    document.documentElement.clientWidth,
    window.innerWidth || 0
);

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            username: 'Anonyymi',
            isFetchingUserInfo: true,
            isDropdownOpen: viewportWidth > 767 ? true : false
        };
    }

    componentWillMount() {
        get('/user-info')
            .then(checkStatus)
            .then(readJson)
            .then((userInfo) => {
                this.setState({
                    loggedIn: userInfo.loggedIn,
                    username: userInfo.username,
                    isFetchingUserInfo: false
                });
            })
            .catch(() => this.setState({isFetchingUserInfo: false}));
    }

    render() {
        var location = window.location.pathname;

        return (
            <div className='header'>
                <div className={'header-content ' + (location == '/diary' ? 'narrow' : '')}>
                    <NavMenu loggedIn={this.state.loggedIn} />
                    <UserInfo loggedIn={this.state.loggedIn} />
                </div>
            </div>
        );
    }
}
