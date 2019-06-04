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
import { registerUser } from '../utils/userAPIs';



class HomePage extends Component {

    state = {
        showLogin: false,
        userRegistered: false,
        
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


    // method for creating(POST) a new user
    handleCreateNewUser = newUserInfo => {
        registerUser(newUserInfo)
            .then(() => {

                this.setState({
                    userRegistered: true,
                    alertMessage: "New User registered successfully"
                });

                alert("New User registered successfully");

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
                        // handleInputChange={this.handleInputChange}
                        // handleQuestionSearch={this.handleQuestionSearch}
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

