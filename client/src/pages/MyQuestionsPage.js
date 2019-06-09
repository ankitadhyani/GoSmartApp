import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Importing custom Components
import AppHeader from '../components/AppHeader/AppHeader';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
// import DisplayMyQuestions from '../components/DisplayMyQuestions/DisplayMyQuestions';


import Questions from '../pages/Questions';


// Importing APIs from utils
import { getQuestionsByUserId } from '../utils/questionAPIs';



class MyQuestionsPage extends Component {

    state = {
        accessToken: localStorage.getItem('accessToken'), // get access token from localStorage
        userLoggedIn: false,
        myQuestionlist: []
    };

    // use component did mount to get all questions on load
    componentDidMount() {
        // console.log("Inside componentDidMount -> MyQuestionsPage.js");

        this.setState({
            userLoggedIn: (this.state.accessToken) ? true : false,
            myQuestionlist: []
        })

        // Get all questions created by user
        this.handleGetQuestionsByUserId();

    } // End of componentDidMount()
    
    handleGetQuestionsByUserId = () => {
        console.log("Inside MyQuestionsPage -> handleGetQuestionsByUserId");

        getQuestionsByUserId()
            .then(({ data: dbQuestionData }) => this.setState({ myQuestionlist: dbQuestionData }))
            .catch(err => console.log(err));

    } // End of handleGetQuestionsByUserId


    render() {

        console.log("Inside MyQuestionsPage --> render()");
        // console.log(this.props);
        console.log(this.state.myQuestionlist);

        return (
            <React.Fragment>

                <AppHeader />

                <div className="row container-fluid bg-info my-1 px-3 ml-0 mr-0">
                    <div className="col-12">
                        <h4 className="text-light mt-2">My Asked Questions</h4>
                    </div>
                    <div className="col-12" style={{fontSize: "15px", lineHeight: "1em"}}>
                        <p>This page will contain all the questions posted by me</p>
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

                    {/* List user data here here */}
                    <div className="col-10">
                        {
                            (this.state.myQuestionlist.length > 0) ? (
                                <Questions
                                    originPage={"MyQuestionsPage"}
                                    myQuestionlist={this.state.myQuestionlist}
                                    searchQuestion={""} // send blank
                                    userLoggedIn={this.state.userLoggedIn}
                                />
                            ) : (
                                <h2>You have not asked any Questions yet.</h2>
                            )
                        }



                    </div>
                </div>
                
                <Footer />

            </React.Fragment>
        )
    }
}

export default MyQuestionsPage;