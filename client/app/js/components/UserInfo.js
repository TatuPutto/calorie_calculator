import React from 'react';

export default function UserInfo({loggedIn}) {
    return (
        <div className='user-info'>
            {loggedIn ? (
                <a href='/logout'>Kirjaudu ulos</a>
            ) : (
                <a href='/login'>
                    <button className='btn btn-success'>
                        <i className='fa fa-sign-in' /> Kirjaudu sisään
                    </button>
                </a>
            )}
        </div>
    );
}
