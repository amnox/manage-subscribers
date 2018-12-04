import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Nav () {
    return (
        <nav className='nav'>
            
            <div>
                <NavLink to='/' exact activeClassName='active'>
                    Home
                </NavLink>
            </div>
            <div>
                <NavLink to='/new_subscriber' exact activeClassName='active'>
                    Add Subscriber
                </NavLink>
            </div>

        </nav>
    )
}