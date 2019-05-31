import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import AppHeader from '../components/AppHeader/AppHeader';
import Registration from '../components/Registration/Registration';
import Questions from './Questions';

import { registerUser } from '../utils/userAPIs';



class HomePage extends Component {

    state = {
        showLogin: false,
        userRegistered: false,
        firstName: "",
        lastName: "",
        nickName: "",
        email: "",
        password: ""
    };


    // handleInputChange
    handleInputChange = event => {

        console.log("Inside HomePage -> handleInputChange()");

        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };


    // Switch state to show different form (login vs registration)
    handleFormSwitch = (formName) => {

        const showLogin = (formName === "login") ? true : false;

        this.setState({
            showLogin
        });

    } //End of handleFormSwitch()


    // method for creating(POST) a new user
    handleCreateNewUser = newUserInfo => {
        registerUser(newUserInfo)
            .then(() => {
                alert("New User registered successfully");
                this.setState({
                    userRegistered: true
                });
            })
            .catch(err => console.log(err));
    }


    // Function that will trigger when user submits a form (LogIn / SignUp)
    // formType = true -> login | formType = false -> signup 
    handleFormSubmit = (formType, event) => {

        event.preventDefault();

        console.log("Inside HomePage -> handleFormSubmit()");
        if (formType) {
            console.log("Log-In form submitted");


        }
        else {
            console.log("Sign-Up form submitted");

            this.handleCreateNewUser({
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                nickName: this.state.nickName,
                email: this.state.email,
                password: this.state.password
            });
        }


    } // End of handleFormSubmit()


    render() {
        return (
            <React.Fragment>
                <div>
                    <AppHeader fluid bg={"dark"}
                        handleFormSwitch={this.handleFormSwitch}
                    />

                    <Registration
                        regStatus={this.state.showLogin}
                        onChange={this.handleInputChange}
                        handleFormSubmit={this.handleFormSubmit}
                    />

                    <div className="row bg-info my-3 pl-5 py-2">
                        <h4 className="text-light">Full Stack Web-Development Questions</h4>
                    </div>

                    <div className="row container-fluid">

                        {/* Left navigation Bar */}
                        <div className="col-2" 
                            style={{
                            borderRight: "5px solid red"
                        }}>
                            <nav class="nav flex-column">
                                <NavLink to="/" className="nav-link navbar-brand active text-dark">HOME</NavLink>
                                <NavLink to="/tags" className="nav-link text-dark">Tags</NavLink>
                                <NavLink to="/users" className="nav-link text-dark">Users</NavLink>
                                <NavLink to="/jobs" className="nav-link text-dark">Jobs</NavLink>
                            </nav>
                        </div>

                        {/* Questions Window */}
                        <div className="col-7" 
                            style={{
                            borderRight: "5px solid red"
                        }}>
                            {/* Call Question list here */}
                            <Questions />

                        </div>

                        {/* Job Opportunities Window */}
                        <div className="col-3">

                        </div>

                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default HomePage;

