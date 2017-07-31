import React from 'react';

import NavMenu from './NavMenu';
import UserInfo from './UserInfo';

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
        fetch('/user-info', {method: 'GET', credentials: 'same-origin'})
            .then((res) => res.json())
            .then((userInfo) => {
                this.setState({
                    loggedIn: userInfo.loggedIn,
                    username: userInfo.username,
                    isFetchingUserInfo: false
                });
            }).catch((err) => {
                this.setState({isFetchingUserInfo: false});
                console.error(err);
            });
    }

    render() {
        return (
            <div className='header'>
                    <div className='header-content'>
                    <NavMenu loggedIn={this.state.loggedIn} />
                    <UserInfo loggedIn={this.state.loggedIn} />
                </div>
            </div>
        );
    }
}
