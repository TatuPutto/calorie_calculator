import React from 'react';

export default class Header extends React.Component {
    constructor() {
        super();
        this.state = {
            loggedIn: false,
            username: 'Anonyymi',
            isFetchingUserInfo: true
        };
    }

    componentWillMount() {
        fetch('http://localhost:3000/user-info', {method: 'GET', credentials: 'same-origin'})
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
                <div className='header-content-wrapper'>
                    <div className='header-content'>
                        <ul className='nav-menu'>
                            <li>Daily intake</li>
                            <li>History</li>
                        </ul>
                        <div className='user-info'>
                            {this.state.isFetchingUserInfo ?
                                <i className='fa fa-refresh fa-spin fa-2x' />
                                :
                                <div>
                                    {this.state.loggedIn ?
                                        <ul>
                                            <li>{this.state.username}</li>
                                            <li><a href='/logout'>Kirjaudu ulos</a></li>
                                        </ul>
                                        :
                                        <a href='/login'>Kirjaudu sisään</a>
                                    }
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
