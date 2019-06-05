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
import { registerUser, loginUser, getUserProfile } from '../utils/userAPIs';



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
            .then(({ data: accessToken }) => {

                console.log("User profile -> accessToken: " + accessToken);
                localStorage.setItem('accessToken', accessToken);


                // Get user information from user table----  ??????
                getUserProfile()
                    .then(({ data: userData }) => {
                        console.log("getUserProfile -> userData -> ");
                        console.log(userData);

                        // Update state with user data
                        this.setState({
                            firstName: userData.firstName,
                            lastName: userData.lastName,
                            nickName: userData.nickName,
                            email: userData.email,
                            password: userData.password,
                            userLoggedIn: true,
                            // alertMessage: "User logged in successfully"
                        });

                    })
                    .catch(err => {
                        console.log(err);
                    });



                // alert("User logged in successfully");

            })
            .catch(err => {
                console.log(err);
                this.setState({
                    userLoggedIn: false,
                    alertMessage: "Incorrect user credentials !!"
                });
                // alert("Incorrect user credentials !!");
            });

    } // End of handleUserLogin()

    // method for creating(POST) a new user
    handleCreateNewUser = newUserInfo => {

        console.log("Inside HomePage -> handleCreateNewUser()");
        // console.log("newUserInfo: ");
        // console.log(newUserInfo);

        registerUser(newUserInfo)
            .then(() => {

                // this.setState({
                //     // userRegistered: true,
                //     alertMessage: "New User registered successfully"
                // });

                // alert("New User registered successfully");

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

            // Check to see if even a single field is absent, show alert and return
            let email = this.state.email; email.trim();
            let password = this.state.password; password.trim();

            if (!email || !password) {
                return this.setState({
                    userRegistered: false,
                    alertMessage: "All fields are mandatory!"
                });
            }

            this.handleUserLogin({
                email: email,
                password: password
            });

        }
        else {
            console.log("Sign-Up form submitted");

            // Check to see if even a single field is absent, show alert and return
            let firstName = this.state.firstName; firstName.trim();
            let lastName = this.state.lastName; lastName.trim();
            let nickName = this.state.nickName; nickName.trim();
            let email = this.state.email; email.trim();
            let password = this.state.password; password.trim();

            if (!firstName || !lastName || !nickName || !email || !password) {
                return this.setState({
                    userRegistered: false,
                    alertMessage: "All fields are mandatory!"
                });
            }

            this.handleCreateNewUser({
                firstName: firstName,
                lastName: lastName,
                nickName: nickName,
                email: email,
                password: password
            });
        }


    } // End of handleFormSubmit()



    /* *************************************************************************************
     *  render function starts here
     * *************************************************************************************/


    render() {
        console.log("Inside HomePage -> render()");
        // console.log("this.state.alertMessage = " + this.state.alertMessage);
        console.log("this.state-----");
        console.log(this.state);


        return (
            <React.Fragment>
                <div>
                    <AppHeader
                        handleFormSwitch={this.handleFormSwitch}
                        alertMessage={this.state.alertMessage}
                        userLoggedIn={this.state.userLoggedIn}
                        fullName={`${this.state.firstName} ${this.state.lastName}`}
                        nickName={this.state.nickName}
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

