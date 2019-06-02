import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import './Navbar.css';



// create a function to export a AppHeader component
function Navbar(props) {

    return (
        <React.Fragment>

            <nav className="nav flex-column">
                <NavLink to="/" className="nav-link navbar-brand text-dark">HOME</NavLink>
                <NavLink to="/tags" className="nav-link text-dark">Tags</NavLink>
                <NavLink to="/users" className="nav-link text-dark">Users</NavLink>
                <NavLink to="/jobs" className="nav-link text-dark">Jobs</NavLink>
            </nav>

        </React.Fragment>
    )
}


export default Navbar;