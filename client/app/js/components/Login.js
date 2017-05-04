import React from 'react';

export default function Login(props) {
    return (
        <div className='login'>
            <form
                action='/check-login'
                method='post'
                enctype="application/x-www-form-urlencoded"
            >
                <label>Käyttäjätunnus</label>
                <br />
                <input type='text' name='username' placeholder='Käyttäjätätunnus' />
                <br />
                <label>Salasana</label>
                <br />
                <input type='text' name='password' placeholder='Salasana' />
                <br />
                <input type='submit' value='submit' />
            </form>
        </div>
    );
}
