import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Importing custom Components
import AppHeader from '../components/AppHeader/AppHeader';
import Navbar from '../components/Navbar/Navbar';
import Footer from "../components/Footer/Footer";
import Questions from './Questions';



function ViewAllQuestions(props) {

    // console.log(props);
    // console.log("props.originPage: "+ props.location.state.originPage);

    return (
        <React.Fragment>
            <AppHeader
                handleFormSwitch={props.handleFormSwitch}
                onChange={props.handleInputChange}
                handleQuestionSearch={props.handleQuestionSearch}
            />

            <div className="row container-fluid">

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
                        // originPage={props.location.state.originPage}
                        originPage={props.location.state ? props.location.state.originPage : "HomePage"}
                    />
                </div>
            </div>
            <Footer />
        </React.Fragment>
    )
}

export default ViewAllQuestions;