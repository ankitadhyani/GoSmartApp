import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import './Navbar.css';



// create a function to export a AppHeader component
function Navbar(props) {
    
    console.log("Navbar component - > ");

    return (
        
        <React.Fragment>

            <nav className="nav flex-column">
                <NavLink to="/" className="nav-link navbar-brand text-dark">HOME</NavLink>
                <NavLink 
                    to={{
                        pathname: "/questions", 
                        state: { originPage: "Navbar" }
                    }} 
                    className="nav-link text-dark"
                >
                    Questions
                </NavLink>


                <NavLink to="/tags" className="nav-link text-dark">Tags</NavLink>
                <NavLink to="/allusers" className="nav-link text-dark">Users</NavLink>
                <NavLink 
                    to={{
                        pathname: "/jobs", 
                        state: { originPage: "Navbar" }
                    }} 
                    className="nav-link text-dark"
                >
                    Jobs
                </NavLink>
            </nav>

        </React.Fragment>
    )
}


export default Navbar;