import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Importing custom Components
import AppHeader from '../components/AppHeader/AppHeader';
import Navbar from '../components/Navbar/Navbar';
import Footer from "../components/Footer/Footer";




function LogoutPage(props) {

    console.log("Inside LogoutPage() page");
    console.log(props);
    localStorage.removeItem('accessToken');

    return (
        <React.Fragment>

            <AppHeader
                // originPage={props.location.state.originPage}
                // handleFormSwitch={handleFormSwitch}
                userLoggedIn={false}
            />


            <div className="row container-fluid mt-5">

                {/* Left navigation Bar */}
                <div className="col-2"
                    style={{
                        borderRight: "5px solid red"
                    }}>
                    <Navbar />
                </div>

                {/* List user data here here */}
                <div className="col-10">
                    <h1>You have successfully logged out!</h1>

                    <Link className="" to={{
                        pathname: "/",
                        state: {
                          // showLogin: false
                        }
                      }}>
                      Go To Home Page
                    </Link>


                </div>
            </div>
            <Footer />
        </React.Fragment>
    )
}

export default LogoutPage;