import React from 'react';

export default function UserInfo({loggedIn}) {
    return (
        <div className='user-info'>
            {loggedIn ? (
                <a href='/logout'>
                    <button className='btn btn-info'>
                        <i className='fa fa-sign-out' /> Kirjaudu ulos
                    </button>
                </a>
            ) : (
                <a href='/login'>
                    <button className='btn btn-info'>
                        <i className='fa fa-sign-in' /> Kirjaudu sisään
                    </button>
                </a>
            )}
        </div>
    );
}
