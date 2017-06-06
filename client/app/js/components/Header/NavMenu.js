import React from 'react';
import {NavLink} from 'react-router-dom';

export default function NavMenu(props) {
    return (
        <ul className='nav-menu'>
            <li>
                <NavLink to='/current-entry' activeStyle={{textDecoration: 'underline'}}>
                    Tänään
                </NavLink>
            </li>
            {props.loggedIn ?
                <li>
                    <NavLink to='/diary' activeStyle={{textDecoration: 'underline'}}>
                        Päiväkirja
                    </NavLink>
                </li>
                :
                <li>
                    <span className='disabled-route'>Päiväkirja</span>
                    <span className='toggle-tooltip'>
                        <i className='fa fa-question' />
                        <span className='no-access-tooltip'>
                            Päiväkirjaominaisuus on käytettävissä vain kirjautuneille käyttäjille.
                        </span>
                    </span>

                </li>
            }
        </ul>
    );
}
