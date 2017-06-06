import React from 'react';

export default function UserInfo(props) {
    return (
        <div className='user-info'>
            {props.loggedIn ?
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
    );
}
