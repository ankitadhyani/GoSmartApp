import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Importing custom Components
import AppHeader from '../components/AppHeader/AppHeader';
import Navbar from '../components/Navbar/Navbar';
import Footer from "../components/Footer/Footer";




function MyProfilePage(props) {

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
                    <h1>This is my Profile Page</h1>


                </div>
            </div>
            <Footer />
        </React.Fragment>
    )
}

export default MyProfilePage;