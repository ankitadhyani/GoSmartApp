import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import ListGroup from '../components/Listing/ListGroup';

// Importing APIs from utils
import { getAllQuestions, updateQuestion, removeQuestion } from '../utils/questionAPIs';
import { getUserProfile } from '../utils/userAPIs';
import { showToastifyAlert } from '../utils/alertAPI';


class Questions extends Component {

    state = {
        accessToken: localStorage.getItem('accessToken'), // get access token from localStorage
        userLoggedIn: false,
        questionlist: [],
        searchQuestion: "", // searchQuestion: "What is REST?",
        searchResultList: [],
        showSearchResult: false, //=true iff user searches for a question, else =false
        currentUserId: "" // stores the value of the userId of the current loggedin user
    };


    // use component did mount to get all questions on load
    componentDidMount() {
        // console.log("Inside componentDidMount -> Question.js");

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

    componentDidUpdate () {
        console.log("Inside Questions.js -> componentDidUpdate()");
        console.log("this.props.searchQuestion = " + this.props.searchQuestion);
        console.log("this.state.searchQuestion = " + this.state.searchQuestion);
        console.log("this.state.showSearchResult = " + this.state.showSearchResult);

        // if(this.props.searchQuestion !== this.state.searchQuestion && this.state.searchResultList.length > 0) {
        // if(this.props.searchQuestion !== this.state.searchQuestion && this.state.showSearchResult === true) {
        //     console.log("Reseting showSearchResult state now");
        //     this.setState({
        //         searchQuestion: this.props.searchQuestion,
        //         showSearchResult: false
        //     });
        // }
    }

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

        // Call function to set 'userLoggedIn' states 
        if (this.props.userLoggedIn === true && this.state.userLoggedIn === false) {
            this.handleGetUserProfile();
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

        // Set question list before display
        let questionlist = [];
        if (this.props.originPage === "MyQuestionsPage") {
            questionlist = this.props.myQuestionlist ;
        } else {
            questionlist = this.state.questionlist ;
        }

        return (
            <React.Fragment>

                {/* Header */}
                <header className="row p-3" style={{ borderBottom: "2px solid black" }}>
                    <div className="col-6">
                        {/* <h3>Top Questions</h3> */}
                        {
                            (this.state.showSearchResult === true) ? (
                                <h3>Search Resuts</h3>
                            ) : (
                                <h3>Top Questions</h3>
                            )
                        }
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
                                (<button
                                    className="btn btn-outline-info btn-dark float-right"
                                    style={{ borderRadius: "5px" }}
                                    onClick={() => 
                                        showToastifyAlert("You need to be logged In to Ask Question!", "error")
                                    }
                                >
                                    <strong>Ask Question</strong>
                                </button>)
                        }
                    </div>
                </header>



                {/* List all questions here */}
                <div className=""
                    style={{
                        height: "370px",
                        overflowY: "scroll"
                    }}>
                    {
                        (this.state.showSearchResult === true) ? (
                           
                            (this.state.searchResultList.length > 0) ? (
                                // If search results are found
                                <ListGroup
                                    questionlist={this.state.searchResultList}
                                    userLoggedIn={this.state.userLoggedIn}
                                    currentUserId={this.state.currentUserId}
                                    handleDeleteQuestion={this.handleDeleteQuestion}
                                    handleUpdateViewCount={this.handleUpdateViewCount}
                                    // searchResultText=`Search Resuts for {this.state.searchQuestion}`
                                />
                            ) : (
                                // If no search results found 
                                <h4>No Search results found for "{this.state.searchQuestion}"</h4>
                            )
                        ) : (
                                <ListGroup
                                    questionlist={this.state.questionlist}
                                    userLoggedIn={this.state.userLoggedIn}
                                    currentUserId={this.state.currentUserId}
                                    handleDeleteQuestion={this.handleDeleteQuestion}
                                    handleUpdateViewCount={this.handleUpdateViewCount}
                                />
                        )
                    }
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

