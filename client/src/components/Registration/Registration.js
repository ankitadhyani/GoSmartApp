import React, { Component } from 'react';
import SignUpWindow from '../SignUpWindow/SignUpWindow';
import './Registration.css';

// Importing APIs from utils
import { getUserProfile } from '../../utils/userAPIs';


class Registration extends Component {

    state = {
        userLoggedIn: false
    };


    // use component did mount to get user Info on load
    componentDidMount() {
        // console.log("Inside Registration -> componentDidMount()");

        // Reset state
        this.setState({
            userLoggedIn: false
        });

        this.setStatesValuesWhenUserLogsIn();

    } //End of componentDidMount()


    // This function is called when in state 'userLoggedIn' is different from that received from HomePage
    setStatesValuesWhenUserLogsIn = () => {
        getUserProfile()
        .then(({ data: userData }) => {

            // Update state with if user data is validated
            this.setState({
                userLoggedIn: true
            });

        })
        .catch(err => {
            console.log(err);

            this.setState({
                userLoggedIn: false
            });
        });
    } // End of setStatesValuesWhenUserLogsIn()



    render() {

        // console.log("Inside Registration component ---- ");
        // console.log("this.props.userLoggedIn= " + this.props.userLoggedIn);

        // Call function to set states 
        if(this.props.userLoggedIn === true && this.state.userLoggedIn === false){
            this.setStatesValuesWhenUserLogsIn();
        }


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
                            style={{ visibility: !this.state.userLoggedIn ? 'visible' : 'hidden' }}
                        >
                            {/* Log In/Sign Up Window within bg image*/}
                            <SignUpWindow 
                                regStatus={this.props.regStatus}
                                handleInputChange={this.props.onChange}
                                handleFormSubmit={this.props.handleFormSubmit}
                            />

                        </div>
                    </div>

                </div>

            </React.Fragment>
        )
    }
}


export default Registration;
