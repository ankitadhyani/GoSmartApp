import React, { Component } from 'react';
import SignUpWindow from '../SignUpWindow/SignUpWindow';
import './Registration.css';


// create a function to export a AppHeader component
function Registration(props) {

    // console.log("props.userLoggedIn= " + props.userLoggedIn);

    return (
        <React.Fragment>

            <div className="d-flex flex-wrap align-content-center cBgImage"
                style={{
                    backgroundImage: `url("./images/GoSmartBgImage.jpg")`
                }}
            >

                <div className="row container-fluid ">
                    <div className="col-8">
                        {/* <h1 className="text-light float-right">Full Stack Web-Development</h1> */}
                    </div>

                    <div 
                        className="col-4 mt-4 float-right" 
                        style={{ visibility: !props.userLoggedIn ? 'visible' : 'hidden' }}
                    >
                        {/* Log In/Sign Up Window within bg image*/}
                        <SignUpWindow 
                            regStatus={props.regStatus}
                            handleInputChange={props.onChange}
                            handleFormSubmit={props.handleFormSubmit}
                        />

                    </div>
                </div>






            </div>

        </React.Fragment>
    )
}


export default Registration;
