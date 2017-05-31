import React from 'react';
import {NavLink} from 'react-router-dom';

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
                <div className='header-content col-md-10 col-sm-12 col-md-offset-1'>
                    <button className='toggle-nav-menu' style={{display: 'none'}}>
                        <i className='fa fa-bars' />
                    </button>
                    <ul className='nav-menu'>
                        <li>
                            <NavLink to='/current-entry' activeStyle={{textDecoration: 'underline'}}>
                                Tänään
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/diary' activeStyle={{textDecoration: 'underline'}}>
                                Päiväkirja
                            </NavLink>
                        </li>
                    </ul>
                    <div className='user-info'>
                        {this.state.loggedIn ?
                            <a href='/logout'>
                                <button>
                                    <i className='fa fa-sign-out' /> Kirjaudu ulos
                                </button>
                            </a>
                            :
                            <a href='/login'>
                                <button>
                                    <i className='fa fa-sign-in' /> Kirjaudu sisään
                                </button>
                            </a>
                        }
                    </div>
                </div>
            </div>
        );
    }
}
