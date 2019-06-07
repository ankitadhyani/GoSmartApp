import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Importing custom Components
import AppHeader from '../components/AppHeader/AppHeader';
import Navbar from '../components/Navbar/Navbar';
import Footer from "../components/Footer/Footer";




function MyQuestionsPage(props) {

    console.log("Inside MyProfilePage(props) page");
    console.log(props);

    return (
        <React.Fragment>

            <AppHeader
                // originPage={props.location.state.originPage}
                // handleFormSwitch={handleFormSwitch}
            />


            <div className="row container-fluid">

                {/* Left navigation Bar */}
                <div className="col-2"
                    style={{
                        borderRight: "5px solid red"
                    }}>
                    <Navbar />
                </div>

                {/* List user data here here */}
                <div className="col-10">
                    <h1>This is my Questions Page</h1>
                    <h5>This page will contain all the questions posted by the user</h5>



                </div>
            </div>
            <Footer />
        </React.Fragment>
    )
}

export default MyQuestionsPage;