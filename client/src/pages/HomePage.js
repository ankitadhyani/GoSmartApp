import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

// Importing custom Components
import AppHeader from '../components/AppHeader/AppHeader';
import Registration from '../components/Registration/Registration';
import Navbar from '../components/Navbar/Navbar';
import Questions from './Questions';
import Alert from '../components/Alert/Alert';
import Footer from "../components/Footer/Footer";


// Importing APIs
import { registerUser, loginUser } from '../utils/userAPIs';



class HomePage extends Component {

    state = {
        showLogin: false,
        userLoggedIn: false,

        searchQuestion: "", // Will store the question to be searched by the user

        // Inputs for form registration
        firstName: "",
        lastName: "",
        nickName: "",
        email: "",
        password: "",
        questionAsked: false,

        alertMessage: "" // Stores the alert message
    };


    // handleInputChange
    handleInputChange = event => {

        // console.log("Inside HomePage -> handleInputChange()");

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


    // This will trigger when user logs in to the app
    handleUserLogin = userInfo => {

        console.log("Inside HomePage -> handleUserLogin()");
        console.log("userInfo: "); console.log(userInfo);

        loginUser(userInfo)
            .then(() => {

                this.setState({
                    userLoggedIn: true,
                    alertMessage: "User logged in successfully"
                });

                alert("User logged in successfully");

            })
            .catch(err => console.log(err));

    } // End of handleUserLogin()

    // method for creating(POST) a new user
    handleCreateNewUser = newUserInfo => {

        console.log("Inside HomePage -> handleCreateNewUser()");
        console.log("newUserInfo: ");
        console.log(newUserInfo);

        registerUser(newUserInfo)
            .then(() => {

                this.setState({
                    // userRegistered: true,
                    alertMessage: "New User registered successfully"
                });

                alert("New User registered successfully");

                //LogIn user with the saved credentials
                this.handleUserLogin({
                    email: this.state.email,
                    password: this.state.password
                });

            })
            .catch(err => console.log(err));

    } // End of handleCreateNewUser()



    // Function that will trigger when user submits a form (LogIn / SignUp)
    // formType = true -> login | formType = false -> signup 
    handleFormSubmit = (formType, event) => {

        event.preventDefault();

        console.log("Inside HomePage -> handleFormSubmit()");
        if (formType) {
            console.log("Log-In form submitted");

            this.handleUserLogin({
                email: this.state.email,
                password: this.state.password
            });

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



    /* *************************************************************************************
     *  render function starts here
     * *************************************************************************************/


    render() {

        return (
            <React.Fragment>
                <div>
                    <AppHeader
                        handleFormSwitch={this.handleFormSwitch}
                        message={this.state.alertMessage}
                        userLoggedIn={this.state.userLoggedIn}
                        fullName={`${this.state.firstName} ${this.state.lastName}`}
                        email={this.state.email}
                    // handleInputChange={this.handleInputChange}
                    // handleQuestionSearch={this.handleQuestionSearch}
                    />

                    <Registration
                        regStatus={this.state.showLogin}
                        userLoggedIn={this.state.userLoggedIn}
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
                            <Navbar />
                        </div>


                        {/* Questions Window */}
                        <div className="col-7"
                            style={{
                                borderRight: "5px solid red"
                            }}>
                            {/* Call Question list here */}
                            {/* <Questions nickName={this.state.nickName}/> */}
                            <Questions originPage={"HomePage"} />

                        </div>


                        {/* Job Opportunities Window */}
                        <div className="col-3">
                            {/* Call Jobs list here */}
                        </div>

                    </div>

                    <Footer />
                </div>
            </React.Fragment>
        )
    }
}

export default HomePage;

