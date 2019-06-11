import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Importing custom Components
import AppHeader from '../components/AppHeader/AppHeader';
import Navbar from '../components/Navbar/Navbar';
import Footer from "../components/Footer/Footer";
// import Questions from './Questions';
import ListGroup from '../components/Listing/ListGroup';

// Importing APIs from utils
import { getAllQuestions, updateQuestion, removeQuestion } from '../utils/questionAPIs';
import { getUserProfile } from '../utils/userAPIs';




class ViewSearchQuestionResultPage extends Component {

    state = {
        accessToken: localStorage.getItem('accessToken'), // get access token from localStorage
        userLoggedIn: false,
        questionlist: [],
        searchQuestion: "", // searchQuestion: "What is REST?",
        searchResultList: [],
        showSearchResult: false, //=true iff user searches for a question, else =false
        currentUserId: "" // stores the value of the userId of the current loggedin user
    }


    // use component did mount to get all questions on load
    componentDidMount() {
        // console.log("Inside componentDidMount -> ViewSearchQuestionResultPage.js");

        //Reset states
        this.setState({
            userLoggedIn: (this.state.accessToken) ? true : false,
            // questionlist: [],
            // searchQuestion: "",
            // searchResultList: [],
            // showSearchResult: false
        })

        // this.setStatesValuesWhenUserLogsIn();
        this.handleGetUserProfile();

        // Get all questions
        this.getQuestions();

    } // End of componentDidMount()
    


    // This function is called when in state 'userLoggedIn' is different from that received from HomePage
    handleGetUserProfile = () => {
        getUserProfile()
            .then(({ data: userData }) => {

                // console.log("Current user id is ------------" + userData._id);

                // Update state with if user data is validated
                this.setState({
                    currentUserId: userData._id,
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




    // Method to get all questions
    getQuestions = () => {

        getAllQuestions()
            .then(({ data: dbQuestionData }) => this.setState({ questionlist: dbQuestionData }))
            .catch(err => console.log(err));

    } // End of getQuestions()



    // Method to remove a question when user clicks on button to remove it
    handleDeleteQuestion = (questionId) => {
        console.log("handleDeleteQuestion is clicked------------------questionid = " + questionId );

        removeQuestion(questionId)
            .then(this.getQuestions)
            .catch(err => console.log(err));

        // You need to refresh the page
        // ReSet question list before display
        
        if (this.props.originPage === "MyQuestionsPage") {
            console.log("MyQuestionsPage ----");
            console.log(this.props.myQuestionlist);

            window.location.reload(); // Hard refresh the page
        }

    } // End of handleDeleteQuestion()



    // Method that updates the view count field of the question schema whenever 
    // a user clicks on to view a question
    handleUpdateViewCount = (questionId, updatedViewCountObj) => {

        console.log("Inside handleUpdateViewCount()");

        updateQuestion(questionId, updatedViewCountObj)
            .then(() => {
                // console.log("Question-> ViewCount updated to " + updatedViewCountObj);
                this.getQuestions();
            })
            .catch(err => console.log(err));

    } // End of handleUpdateViewCount()




    // This function is called when user requests to seach for a question
    handleSearchQuestionString = (cpySearchQuestion) => {

        console.log("Inside Questions -> handleSearchQuestionString()");

        // Create a dictionary that contains words that have to be IGNORED in the search question string
        const dictionary = ["a", "an", "the", "what", "is", "any", "should", "would", "ask", "i", "like", "to", "you", "how", "write", "in", "when", "can", "let", "my"];

        const specialCharacterList = ["?", "!", ":", "\""];


        // Eliminate all the special characters from the string
        for (let i = 0; i < specialCharacterList.length; i++) {
            cpySearchQuestion = cpySearchQuestion.replace(specialCharacterList[i], '');
        }
        // console.log("cpySearchQuestion after removing special chars: " + cpySearchQuestion);


        for (let i = 0; i < dictionary.length; i++) {
            cpySearchQuestion = cpySearchQuestion.split(dictionary[i] + " ").join('');
        }
        // console.log("cpySearchQuestion after removing dictionary words: " + cpySearchQuestion);

        // Convert the rest of the string into array
        cpySearchQuestion = cpySearchQuestion.split(" ");
        // console.log("cpySearchQuestion[]: " + cpySearchQuestion);


        // Declare array that will store only those questions that will match the question asked by user
        let responseToSeachQuestion = [];


        // Now "cpySearchQuestion" contains the specific keywords that if present in a 
        // question will display only those questions on th UI
        return (
            (this.state.questionlist.length > 0) ?
                (
                    this.state.questionlist.map(ques => {

                        // console.log(ques.question);

                        cpySearchQuestion.forEach(keyword => {

                            if (ques.question.toLowerCase().includes(keyword)) {
                                // console.log("Match found: " + ques.question);
                                responseToSeachQuestion.push(ques);
                            }
                        })
                    })
                ) :
                (
                    <h2>No matching question found!. Ask question</h2>
                ),


            // console.log("responseToSeachQuestion: " + responseToSeachQuestion),
            (responseToSeachQuestion.length > 0 && this.state.searchQuestion !== "") ?
                (
                    this.setState({
                        searchResultList: responseToSeachQuestion,
                        // searchQuestion: "",
                        showSearchResult: true
                    })
                ) : (
                    ""
                )
        )

    } // End of handleSearchQuestionString()




    /* *************************************************************************************
     *  render function starts here
     * *************************************************************************************/



    render() {

        console.log("Inside ViewSearchQuestionResultPage(props) render");
        console.log("props.originPage: "+ this.props.location.state.originPage);
        console.log(this.props.location.state);

        // Call function to set 'userLoggedIn' states 
        if (this.props.location.state.userLoggedIn === true && this.state.userLoggedIn === false) {
            this.handleGetUserProfile();
        }
        
        let searchQuestion = this.props.location.state.searchQuestion;
        console.log("searchQuestion: " + searchQuestion);


        // Set the 'searchQuestion' state to the value fed from ViewAllQuestions.js
        // if (this.props.searchQuestion && this.state.showSearchResult === false) {
        // if (this.props.location.state.searchQuestion && this.state.showSearchResult === false) {
        if (this.props.location.state.searchQuestion && this.state.searchQuestion === "") {
            this.setState({
                searchQuestion: searchQuestion,
                showSearchResult: true
            })
        
        


            let cpySearchQuestion = this.state.searchQuestion; // "What is REST?";
            cpySearchQuestion = cpySearchQuestion.trim();

            // If user has entered a question to be searched, 
            // then update 'questionlist[]' with related questions only
            if (cpySearchQuestion !== "") {
                // console.log("Calling handleSearchQuestionString() now...");
                this.handleSearchQuestionString(cpySearchQuestion.toLowerCase());
            }
        }

        return (
            <React.Fragment>

                <AppHeader
                    // originPage={this.props.location.state.originPage}
                    // handleFormSwitch={handleFormSwitch}
                />


                <div className="row container-fluid bg-info my-1 px-3 ml-0 mr-0">
                    <div className="col-12">
                        <h4 className="text-light mt-2">Similar Questions</h4>
                    </div>
                    <div className="col-12" style={{ fontSize: "15px", lineHeight: "1em" }}>
                        <p>Showing search results for: "<span className="font-weight-bold">{this.props.location.state.searchQuestion}</span>"</p>
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
                        {/* <Questions
                            searchQuestion={props.location.state ? props.location.state.searchQuestion : ""}
                            originPage="ViewSearchQuestionResultPage"
                        /> */}

                        {/* Header */}
                        <header className="row p-3" style={{ borderBottom: "2px solid black" }}>
                            <div className="col-6">
                                <h3>Top Questions</h3>
                            </div>

                            <div className="col-6">
                                {/* If user is logged in then show a link to "Ask Question" -> /add */}
                                {/* Else show a lable */}
                                {
                                    (this.state.userLoggedIn) ?
                                        (<Link
                                            to={{
                                                pathname: "/add",
                                                state: { showPostQuestion: true }
                                            }}
                                            className="btn btn-outline-info btn-dark float-right"
                                        >
                                            <strong>Ask Question</strong>
                                        </Link>) :
                                        (<label
                                            className="text-dark float-right p-2"
                                            style={{ borderRadius: "5px", backgroundColor: "rgb(174, 174, 175)" }}
                                        >
                                            <strong>Ask Question</strong>
                                        </label>)
                                }
                            </div>
                        </header>

                        {/* List all questions here */}
                        <div className=""
                            style={{
                                height: "370px",
                                overflowY: "scroll"
                            }}>
                            <ListGroup
                                // questionlist={
                                //     (this.state.searchResultList.length > 0) ?
                                //         this.state.searchResultList : ""
                                // } 
                                questionlist={this.state.searchResultList}
                                userLoggedIn={this.state.userLoggedIn}
                                currentUserId={this.state.currentUserId}
                                handleDeleteQuestion={this.handleDeleteQuestion}
                                handleUpdateViewCount={this.handleUpdateViewCount}
                            />
                        </div>


                    </div>
                </div>

                <Footer />

            </React.Fragment>
        )
    }
}

export default ViewSearchQuestionResultPage;