import React from 'react';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            username: 'Anonyymi',
            isFetchingUserInfo: true,
            isDropdownOpen: this.props.viewportWidth > 767 ? true : false
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
        var now = new Date();
        var day = now.getDate();
        var month = now.getMonth() + 1;

        return (
            <div className='header'>
                <div className='header-content-wrapper'>
                    <div className='header-content'>
                        <button className='toggle-nav-menu' style={{display: 'none'}}>
                            <i className='fa fa-bars' />
                        </button>
                        <ul className='nav-menu'>
                            <li>{day + '.' + month}</li>
                            <li>Päiväkirja</li>
                        </ul>
                        <div className='user-info'>
                            {this.state.loggedIn ?
                                <a href='/logout'>
                                    <button>
                                        Kirjaudu ulos
                                    </button>
                                </a>
                                :
                                <a href='/login'>
                                    <button>
                                        Kirjaudu sisään
                                    </button>
                                </a>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
