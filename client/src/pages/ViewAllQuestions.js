import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Importing custom Components
import AppHeader from '../components/AppHeader/AppHeader';
import Navbar from '../components/Navbar/Navbar';
import Footer from "../components/Footer/Footer";
import Questions from './Questions';



function ViewAllQuestions(props) {
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
                    <Questions originPage={"ViewAllQuestions"} />
                </div>
            </div>
            <Footer />
        </React.Fragment>
    )
}

export default ViewAllQuestions;