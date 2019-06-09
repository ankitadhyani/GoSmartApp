import React, { Component } from 'react';
import { Link } from 'react-router-dom';


// Importing custom Components
import AppHeader from '../components/AppHeader/AppHeader';
import Navbar from '../components/Navbar/Navbar';
import Footer from "../components/Footer/Footer";


// Importing APIs from utils
import { getUserProfile, updateUserProfile } from '../utils/userAPIs';
import { showToastifyAlert } from '../utils/alertAPI';





class MyProfilePage extends Component {

    state = {
        accessToken: localStorage.getItem('accessToken'), // get access token from localStorage
        userLoggedIn: false,
        userId: "",
        firstName: "",
        lastName: "",
        nickName: "",
        email: "",
        password: "",
        savedJobsArray: [],
        passFieldDisabled: true
    };

    // use component did mount to get all questions on load
    componentDidMount() {
        this.handleGetUserProfile();
    }

    // handleInputChange
    handleInputChange = event => {

        // console.log("Inside MyProfilePage -> handleInputChange()");

        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    // Function that gets the current user's information from database
    handleGetUserProfile = () => {

        getUserProfile()
            .then(({ data: userData }) => {

                // Update state with user data
                this.setState({
                    userId: userData._id,
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    nickName: userData.nickName,
                    email: userData.email,
                    password: userData.password,
                    savedJobsArray: userData.savedJobsArray,
                    userLoggedIn: (this.state.accessToken) ? true : false
                });
            })
            .catch(err => {
                console.log(err);
            });

    } // End of handleGetUserProfile()



    // This function toggels the password field enabling/disabling based on checkbox change 
    toggleCheckboxChange = () => {
        // console.log("Inside toggleCheckboxChange()");

        this.setState({
            passFieldDisabled: !this.state.passFieldDisabled
        })

    } // End of toggleCheckboxChange



    // This function is called when user clicks on update 
    handleUpdateUserProfile = (event) => {

        console.log("Inside MyProfilePage -> handleUpdateUserProfile()");

        event.preventDefault();

        const updatedUserData = {
            userId: this.state.userId,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            nickName: this.state.nickName,
            email: this.state.email,
            password: this.state.password,
            savedJobsArray: this.state.savedJobsArray
        };

        updateUserProfile(updatedUserData)
            .then(({ data: userData }) => {

                showToastifyAlert("User profile updated successfully", "success");

                this.handleGetUserProfile();
            })
            .catch(err => {
                console.log(err);
            });

        

    } // End of handleUpdateUserProfile




    /* *************************************************************************************
     *  render function starts here
     * *************************************************************************************/

    render() {

        console.log("Inside MyProfilePage render()");
        console.log(this.state);


        return (
            <React.Fragment>

                <AppHeader />

                <div className="row container-fluid bg-info my-1 px-3 ml-0 mr-0">
                    <div className="col-12">
                        <h4 className="text-light mt-2">My Profile</h4>
                    </div>
                    <div className="col-12" style={{ fontSize: "15px", lineHeight: "1em" }}>
                        <p>View or Update profile</p>
                    </div>
                </div>

                <div className="row container-fluid mt-3 mb-5">

                    {/* Left navigation Bar */}
                    <div className="col-2"
                        style={{
                            borderRight: "5px solid red"
                        }}>
                        <Navbar />
                    </div>



                    {/* List my profile form here */}
                    <div className="col-10 card-body border-info" style={{ height: "440px", overflowY: "scroll" }}>


                        <form id="form-user-profile">

                            {/* Profile pic, First name, last name, nick name */}
                            <div class="row">

                                {/* Profile Pic */}
                                <img
                                    className="img-thumbnail col-3 ml-5"
                                    src="/images/confused-emoticon.jpg"
                                    alt={this.state.nickName}
                                    style={{
                                        height: "100%",
                                        width: "100%",
                                        borderRadius: "50%",
                                        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
                                    }}
                                >
                                </img>

                                <div className="col ml-5 mt-5">

                                    {/* First Name */}
                                    <div className="form-group row">
                                        <label for="firstName-input" className="col-3 col-form-label">
                                            <strong>First Name*</strong>
                                        </label>
                                        <div className="col">
                                            <input
                                                type="text"
                                                value={this.state.firstName}
                                                name="firstName"
                                                placeholder="Enter your First Name"
                                                className="form-control"
                                                onChange={this.handleInputChange}
                                            />
                                        </div>
                                    </div>

                                    {/* Last Name */}
                                    <div className="form-group row">
                                        <label for="lastName-input" className="col-3 col-form-label">
                                            <strong>Last Name*</strong>
                                        </label>
                                        <div className="col">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter your Last Name"
                                                value={this.state.lastName}
                                                name="lastName"
                                                onChange={this.handleInputChange}
                                            />
                                        </div>
                                    </div>

                                    {/* Nick Name */}
                                    <div className="form-group row">
                                        <label for="phoneNo-input" className="col-3 col-form-label">
                                            <strong>Nick Name*</strong>
                                        </label>
                                        <div className="col">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter your Nick Name"
                                                value={this.state.nickName}
                                                name="nickName"
                                                onChange={this.handleInputChange}
                                                disabled
                                            />
                                        </div>
                                    </div>

                                </div>
                            </div>


                            {/* Email Id and password */}
                            <div class="row mt-3">
                                <div class="col-6">
                                    {/* Email Id */}
                                    <div class="form-group">
                                        <label for="emailId-input"><strong>Email Id</strong></label>
                                        <input 
                                            class="form-control" 
                                            type="email"
                                            placeholder="Enter your Email Id" 
                                            value={this.state.email}
                                            name="email"
                                            disabled 
                                        />
                                    </div>
                                </div>

                                {/* Password */}
                                <div class="col-6">
                                    <div class="form-group">
                                        <label for="password-input"><strong>Password</strong></label>
                                        <input
                                            class="form-control"
                                            type="password"
                                            placeholder="Password"
                                            value={this.state.password}
                                            name="password"
                                            onChange={this.handleInputChange}
                                            disabled={this.state.passFieldDisabled ? true : false}
                                        />
                                        <input
                                            type="checkbox"
                                            value={!this.state.passFieldDisabled}
                                            checked={!this.state.passFieldDisabled}
                                            onChange={this.toggleCheckboxChange}
                                        />
                                        <label
                                            class="form-check-label ml-3 text-info"
                                            for="checkboxPwdUpd"
                                        >
                                            Update Password
                                        </label>
                                    </div>
                                </div>

                            </div>

                            {/* Submit buttons */}
                            <div class="row mt-1">
                                <div class="col-6">
                                    {/* Update button */}
                                    <button
                                        class="btn btn-info mt-2 mb-2 p-1 btn-block"
                                        type="submit"
                                        onClick={(e) => this.handleUpdateUserProfile(e)}
                                    >
                                        <h5>Update Profile</h5>
                                    </button>
                                </div>

                                <div class="col-6">
                                    {/* Go home */}
                                    <Link className="btn btn-dark border-info mt-2 mb-2 p-1 btn-block"
                                        to={{
                                            pathname: "/"
                                        }}
                                    >
                                        <h5>Go To Home Page</h5>
                                    </Link>
                                </div>
                            </div>
                        </form>


                    </div>
                </div>

                <Footer />

            </React.Fragment>
        )
    }
}

export default MyProfilePage;