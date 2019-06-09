import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Importing custom Components
import AppHeader from '../components/AppHeader/AppHeader';
import Navbar from '../components/Navbar/Navbar';
import Footer from "../components/Footer/Footer";
import Questions from './Questions';



// Switch state to show different form (login vs registration)
function handleFormSwitch(formName) {

    const showLogin = (formName === "login") ? true : false;

    this.setState({
        showLogin
    });

} //End of handleFormSwitch()



function ViewAllQuestions(props) {

    console.log("Inside ViewAllQuestions(props) page");
    console.log(props);
    console.log("props.originPage: "+ props.location.state.originPage);

    return (
        <React.Fragment>

            <AppHeader
                originPage={props.location.state.originPage}
                handleFormSwitch={handleFormSwitch}
            />


            <div className="row container-fluid bg-info my-1 px-3 ml-0 mr-0">
                <div className="col-12">
                    <h4 className="text-light mt-2">All Questions</h4>
                </div>
                <div className="col-12" style={{ fontSize: "15px", lineHeight: "1em" }}>
                    <p>Showing all questions asked by users (in order of max views)</p>
                </div>
            </div>


            <div className="row container-fluid mt-3">

                {/* Left navigation Bar */}
                <div className="col-2"
                    style={{
                        borderRight: "5px solid red"
                    }}>
                    <Navbar />
                </div>

                {/* List all questions here */}
                <div className="col-10">
                    <Questions
                        searchQuestion={props.location.state ? props.location.state.searchQuestion : ""}
                        originPage={props.location.state ? props.location.state.originPage : "HomePage"}
                    />
                </div>
            </div>
            <Footer />
        </React.Fragment>
    )
}

export default ViewAllQuestions;