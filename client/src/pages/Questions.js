import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import ListGroup from '../components/Listing/ListGroup';

// Importing APIs from utils
import { getAllQuestions, updateQuestion, removeQuestion } from '../utils/questionAPIs';
import { getUserProfile } from '../utils/userAPIs';


class Questions extends Component {

    state = {
        userLoggedIn: false,
        questionlist: [],
        searchQuestion: "", // searchQuestion: "What is REST?",
        searchResultList: [],
        showSearchResult: false //=true iff user searches for a question, else =false
    };


    // use component did mount to get all questions on load
    componentDidMount() {
        // console.log("Inside componentDidMount -> Question.js");

        //Reset states
        this.setState({
            userLoggedIn: false,
            questionlist: [],
            searchQuestion: "",
            searchResultList: [],
            showSearchResult: false
        })

        this.setStatesValuesWhenUserLogsIn();

        // Get all questions
        this.getQuestions();

    } // End of componentDidMount()



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
    


    // Method to get all questions
    getQuestions = () => {

        getAllQuestions()
            .then(({ data: dbQuestionData }) => this.setState({ questionlist: dbQuestionData }))
            .catch(err => console.log(err));

    } // End of getQuestions()



    // Method to remove a question when user clicks on button to remove it
    handleDeleteQuestion = (questionId) => {

        removeQuestion(questionId)
            .then(this.getQuestions)
            .catch(err => console.log(err));

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
            (responseToSeachQuestion.length > 0) ?
                (
                    this.setState({
                        searchResultList: responseToSeachQuestion,
                        searchQuestion: "",
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

        console.log("Inside Question.js");

        // Call function to set states 
        if(this.props.userLoggedIn === true && this.state.userLoggedIn === false){
            this.setStatesValuesWhenUserLogsIn();
        }

        // If user clicks on "Questions" link from Navbar then reset states
        if (this.props.originPage === "Navbar" && this.state.showSearchResult === true) {
            this.setState({
                showSearchResult: false
            })
        }
        // Set the 'searchQuestion' state to the value fed from ViewAllQuestions.js
        if (this.props.searchQuestion && this.state.showSearchResult === false) {
            this.setState({
                searchQuestion: this.props.searchQuestion,
                showSearchResult: true
            })
        }

        if (this.state.searchQuestion) {

            // console.log("this.state.searchQuestion: " + this.state.searchQuestion);

            let cpySearchQuestion = this.state.searchQuestion; // "What is REST?";
            cpySearchQuestion = cpySearchQuestion.trim();

            // If user has entered a question to be searched, 
            // then update 'questionlist[]' with related questions only
            // if (this.state.searchQuestion) {
            if (cpySearchQuestion) {
                // console.log("Calling handleSearchQuestionString() now...");
                this.handleSearchQuestionString(cpySearchQuestion.toLowerCase());
            }
        }

        // console.log("this.state.showSearchResult: " + this.state.showSearchResult);


        return (
            <React.Fragment>

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
                        height: "350px",
                        overflowY: "scroll"
                    }}>
                    <ListGroup
                        questionlist={
                            (this.state.showSearchResult) ?
                                this.state.searchResultList : this.state.questionlist
                        }
                        userLoggedIn={this.state.userLoggedIn}
                        handleDeleteQuestion={this.handleDeleteQuestion}
                        handleUpdateViewCount={this.handleUpdateViewCount}
                    />
                </div>

                {/* Show View all questions button iff we have atleast 1 question */}
                {
                    (this.state.questionlist.length > 0 && this.props.originPage === "HomePage") ?
                        (
                            <Link
                                to={{
                                    pathname: "/questions", 
                                    state: { originPage: "Navbar" }
                                }} 
                                className="btn btn-block btn-outline-info btn-dark align-items-end text-center"
                                questionlist={this.state.questionlist}
                                handleDeleteQuestion={this.handleDeleteQuestion}
                            >
                                <strong>View All Questions</strong>
                            </Link>

                        ) :
                        ("")
                }


            </React.Fragment>
        )
    }
}

export default Questions;

