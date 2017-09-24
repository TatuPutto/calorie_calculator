import React from 'react';
import {NavLink} from 'react-router-dom';

export default function NavMenu({loggedIn}) {
    var activeStyles = {
        padding: '3px',
        borderBottom: '2px solid'
    };

    return (
        <ul className='nav-menu'>
            <li>
                <NavLink to='/current-entry' activeStyle={activeStyles}>
                    Tänään
                </NavLink>
            </li>
            {loggedIn ? (
                <li>
                    <NavLink to='/diary' activeStyle={activeStyles}>
                        Päiväkirja
                    </NavLink>
                </li>
            ) : (
                <li>
                    <span className='disabled-route'>Päiväkirja</span>
                    <span
                        className='toggle-tooltip'
                        data-tooltip-text='Päiväkirjaominaisuus on käytettävissä vain kirjautuneille käyttäjille.'
                    >
                        <i className='fa fa-question' />
                    </span>
                </li>
            )}
        </ul>
    );
}
