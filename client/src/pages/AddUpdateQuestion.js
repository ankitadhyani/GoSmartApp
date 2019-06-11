import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';

// Importing custon Components
import AppHeader from '../components/AppHeader/AppHeader';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import UserReply from '../components/UserReply/UserReply';
import ShowAllReplies from '../components/UserReply/ShowAllReplies';


// Importing APIs from utils
import { getUserProfile } from '../utils/userAPIs';
import { getAllQuestions, getQuestionById, createQuestion, updateQuestion, removeQuestion } from '../utils/questionAPIs';
import { getAllReplies, getReplyById, createReply, updateReply, removeReply } from '../utils/replyAPIs';
import { showToastifyAlert } from '../utils/alertAPI';

import predefinedTags from "../predefinedTags.json";


var moment = require('moment');


class AddUpdateQuestion extends Component {

    state = {
        preDefinedTagList: predefinedTags,

        // States that handle question
        id: "", // stores questionId
        question: "",
        quesDescription: "",
        userTags: [],
        repliesObject: [],
        viewCount: 0,
        userId: "",
        dateAdded: "",

        // States that handle reply
        replyId: "",
        reply: "",
        replyThumbsUpCount: 0,
        replyThumbsDownCount: 0,
        replyAddedOn: "",
        replyUserId: "",
        replylist: [], // This contains all the replies from reply DB
        editedReply: "", //This will contain content when user wants to edit a reply

        // questionSaved: false,
        currentTag: "",
        setQuesInputDisabled: true, 
        setUpdateBtnVisibleTrue: false,
        refreshViewUpdatePage: false,
        showUserReplyCommentBox: true,
        enableReplyCommentBox: false,
        saveEditReplyBtnToggle: false,
        userTagsUpdated: false,

        // Get below states from getUserProfile()
        currentUserNickName: "",
        currentUserId: "",
        userLoggedIn: false
    };


    // use component did mount to get all questions on load
    componentDidMount() {
        // console.log("Inside AddUpdateQuestion -> componentDidMount()");

        // Get user info and extract user nickName from user table to feed it in Question & Reply table
        // In case of error (meaning no user is logged in) the set 'userLoggedIn' state to false
        getUserProfile()
        .then(({ data: userData }) => {
            // console.log("AddUpdateQuestion -> getUserProfile -> userData -> ");
            // console.log(userData);

            // Update state with user data
            this.setState({
                currentUserId: userData._id,
                currentUserNickName: userData.nickName,
                userLoggedIn: true
            });

        })
        .catch(err => {
            console.log(err);

            // Update state with user data
            this.setState({
                userLoggedIn: false
            });
        });

        // If we have a question Id in the URL bar then based on that Id get question data from DB
        if (this.props.match.params.id) {
            // extract id of question out of this.props.match.params.id
            const questionId = this.props.match.params.id;

            this.handleGetQuestionById(questionId);
        }

    } //End of componentDidMount()



    // handleInputChange
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    // handleInputChange
    handleEditedReplyInputChange = (event, replyOrigValue )=> {
        const { name, value } = event.target;

        value = replyOrigValue + value;

        this.setState({
            [name]: value
        });
    }



    // Function that is called to refresh the states with current question information
    handleGetQuestionById = (questionId) => {

        getQuestionById(questionId)
            .then(({ data: questionData }) => {

                this.setState({
                    id: questionId,
                    question: questionData.question,
                    quesDescription: questionData.quesDescription,
                    userTags: questionData.userTags,
                    repliesObject: questionData.repliesObject,
                    viewCount: questionData.viewCount,
                    userId: questionData.userId,
                    dateAdded: questionData.dateAdded,
                    quesNickName: questionData.quesNickName,
                    currentTag: "",
                    setQuesInputDisabled: true // Also reset setQuesInputDisabled= true cs again the buttons should be disabled 

                });

                // Call function to get all replies and post on the question page
                this.handleGetAllReplies();


            })
            .catch(err => {
                console.log(err);
                showToastifyAlert("Question not found!", "error");
            });

    } // End of handleGetQuestionById()


    // This function will trigger when user clicks on "Ask question" from updateQuestion Page
    // At this tage all the state values will be reset to default except for one state 'setQuesInputDisabled' = false
    handleAskQuestion = () => {

        console.log("Inside handleAskQuestion()");
        this.setState({
            // States that store the question fields
            id: "",
            question: "",
            quesDescription: "",
            userTags: [],
            repliesObject: [],
            viewCount: 0,
            userId: "",
            dateAdded: "",
            quesNickName: "",

            // questionSaved: false,
            currentTag: "",
            setQuesInputDisabled: false, // this will change to false
            setUpdateBtnVisibleTrue: true,
            showUserReplyCommentBox: false, // this will change to false
            refreshViewUpdatePage: false,

            // States that handle reply
            replyId: "",
            reply: "",
            replyThumbsUpCount: 0,
            replyThumbsDownCount: 0,
            replyAddedOn: "",
            replyUserId: "",
            replylist: [],
            replyUserNickName: "",
            // editedReply: "" //This will contain content when user wants to edit a reply

        });
    }




    // This function will generate the DataList for tags
    generateDataList = () => {

        console.log("Inside generateDataList()");
        return (this.state.preDefinedTagList.map((tag, key) => <option value={tag.name} />))

    } // End of generateDataList()



    // This function triggers when a tag is selected
    handleTagSelection = event => {

        console.log("Inside handleTagSelection()");

        const { name, value } = event.target;
        // console.log(name + " :: " + value);

        this.setState({
            [name]: value
        });

    } // End of handleTagSelection()




    // Function that triggers when user selects a skill tag
    handleTagAddition = () => {

        console.log("Inside handleTagAddition()");

        //If user has already selected the tag then ignore else add the 'currentTag' to 'userTags' list
        if (this.state.userTags.includes(this.state.currentTag)) {
            return;
        }
        else {
            // console.log("this.state.userTags: " + this.state.userTags);
            let updatedTags = [...this.state.userTags, this.state.currentTag];
            // console.log("updatedTags: " + updatedTags);

            this.setState({
                userTags: updatedTags,
                currentTag: ""
            });
        }

    } // End of handleTagAddition()

    //Function that triggers when user clicks on delete tag (x)
    handleTagDeletion = (tagToBeDeleted) => {
        console.log("Inside handleTagDeletion()");


        if( (this.state.id && this.state.setQuesInputDisabled)) {
            // console.log("CANNOT delete tag");
            return;
        }
        console.log("tagToBeDeleted = " + tagToBeDeleted);
        console.log(this.state.userTags);

        let updatedUserTags = [];
        
        this.state.userTags.map((tag, key) =>{
            if(tag !== tagToBeDeleted) {
                updatedUserTags.push(tag);
            }
        })
        console.log("updatedUserTags = " + updatedUserTags);

        this.setState({
            userTags: updatedUserTags
        })

    } // End of handleTagDeletion()



    // Function that shows user selected tags on the UI
    showUserTags = () => {
        // console.log("Inside showUserTags()");
        // console.log("this.state.userTags = " + this.state.userTags);

        const noOfUserTags = (this.state.userTags) ? this.state.userTags.length : 0;

        return (
            (noOfUserTags > 0) ?

                (this.state.userTags.map((tag, key) =>

                    <label className="m-1 p-2 btn btn-outline-info text-dark"
                        onClick={() => this.handleTagDeletion(tag)}
                        style={{ borderRadius: "3px" }}
                        disabled={(this.state.id && this.state.setQuesInputDisabled) ? (true) : (false)}
                    >
                        {tag} <i className="far fa-times-circle btn"disabled={(this.state.id && this.state.setQuesInputDisabled) ? (true) : (false)} ></i>
                    </label>)
                ) :
                (<h4 className="text-center">No Tag Selected</h4>)
        )
    }


    // method for creating/POSTing a question
    handleCreateQuestion = questionInfo => {
        createQuestion(questionInfo)
            .then(({ data: dbNewQuestionData }) => {

                showToastifyAlert("Question created successfully!", "success");

                console.log("Question created successfully! :: dbNewQuestionData => ");
                console.log(dbNewQuestionData);

                // Call getQuestionById function to update the states with current question data
                this.handleGetQuestionById(dbNewQuestionData._id);

            })
            .catch(err => {
                console.log(err);
                showToastifyAlert("Failed to create question!", "error");
            });
    }



    // method for updating/PUTting a question
    handleUpdateQuestion = (questionId, questionInfo) => {
        
        updateQuestion(questionId, questionInfo)
            .then(() => {

                // Call getQuestionById function to update the states with current question data
                this.handleGetQuestionById(questionId);

            })
            .catch(err => {
                console.log(err);
                showToastifyAlert("Failed to update question!", "error");
            });

    } // End of handleUpdateQuestion()


    resetQuestionStates = () => {
        this.setState({
            question: this.state.question,
            quesDescription: this.state.quesDescription,
            userTags: this.state.userTags,
            repliesObject: this.state.repliesObject,
            viewCount: this.state.viewCount,
            userId: this.state.userId,
            dateAdded: this.state.dateAdded,
            quesNickName: this.state.quesNickName,
        });
    }

    handleFormSubmit = event => {
        event.preventDefault();

        console.log("this.state.question => " + this.state.question);
        let ques = this.state.question;
        if(ques.trim() === "") {
            return showToastifyAlert("Question Field is mandatory!", "error");
        }

        // If user has not selected atleast one tag then do not submit the question
        if(this.state.userTags.length < 1) {
            return showToastifyAlert("Tag field is mandatory!", "error");
        }

        // if this.state.id exists, run update method
        if (this.state.id) {

            this.handleUpdateQuestion(this.state.id,
                {
                    question: this.state.question,
                    quesDescription: this.state.quesDescription,
                    userTags: this.state.userTags,
                    repliesObject: this.state.repliesObject,
                    viewCount: this.state.viewCount,
                    userId: this.state.userId,
                    dateAdded: this.state.dateAdded,
                    quesNickName: this.state.quesNickName,
                });
        }
        // else just create a new question
        else {

            this.handleCreateQuestion({
                question: this.state.question,
                quesDescription: this.state.quesDescription,
                userTags: this.state.userTags,
                repliesObject: this.state.repliesObject,
                viewCount: this.state.viewCount,
                userId: this.state.currentUserId, // Update with current user Id
                dateAdded: moment().format('MMMM Do YYYY, h:mm a'),
                quesNickName: this.state.currentUserNickName
            });
        }
    }


    // Function that resets disabled functionality when user clicks on Edit button
    handleResetQuesInputDisabled = () => {

        this.setState({
            setQuesInputDisabled: false
        });
    }


    // method for creating/POSTing a reply to the database
    handleCreateReply = replyInfo => {
        console.log("Inside handleCreateReply()");

        createReply(replyInfo)
            .then((dbReplyData) => {

                // showToastifyAlert("Reply created successfully!", "success");

                // Now add the reply Id to Questions table
                // console.log("dbReplyData------ ");
                // console.log(dbReplyData.data + " :: " + dbReplyData.data._id);

                let updatedRepliesObject = [...this.state.repliesObject, dbReplyData.data._id];
                // console.log("updatedRepliesObject: " + updatedRepliesObject);

                this.setState({
                    repliesObject: updatedRepliesObject
                });

                // Call PUT method for updating the question with new reply object
                this.handleUpdateQuestion(this.state.id,
                    {
                        question: this.state.question,
                        quesDescription: this.state.quesDescription,
                        userTags: this.state.userTags,
                        repliesObject: this.state.repliesObject,
                        viewCount: this.state.viewCount,
                        userId: this.state.userId,
                        dateAdded: this.state.dateAdded,
                        quesNickName: this.state.quesNickName
                    });

            })
            .catch(err => {
                console.log(err);
                showToastifyAlert("Reply Creation Failed!", "error");
            });
    }


    // Function to get all replies for this question
    handleGetAllReplies = () => {
        console.log("Inside handleGetAllReplies()");

        // If repliesObject[] has atleast 1 reply id (-1 because incase user deletes the one reply)
        if (this.state.repliesObject.length > -1) {

            // First empty the replylist[] and then add contents to it
            let emptyReplylist = [];
            this.setState({
                reply: "",
                replylist: emptyReplylist,
            });

            // Now for every reply Id linked to Questions get all data and store in replylist[]
            this.state.repliesObject.forEach(replyId => {

                getReplyById(replyId)
                    .then(({ data: replyData }) => {

                        let cpyReplylist = [...this.state.replylist, replyData];

                        this.setState({
                            replylist: cpyReplylist,
                        });
                    })
                    .catch(err => {
                        console.log(err);
                        showToastifyAlert("Reply not found in DB!", "error");
                    });
            });
        }
        else {
            return;
        }

    } // End of handleGetAllReplies()



    // This function handles Reply form submission
    handleReplyFormSubmit = (event) => {
        event.preventDefault();

        console.log("Inside handleReplyFormSubmit()");

        // If user is not logged in then do not accept the answer
        if(!this.state.userLoggedIn) {
            return showToastifyAlert("Please Log-In to Post your Answer!", "error");
        }

        // Create reply data
        this.handleCreateReply({
            reply: this.state.reply,
            replyThumbsUpCount: this.state.replyThumbsUpCount,
            replyThumbsDownCount: this.state.replyThumbsDownCount,
            replyAddedOn: moment().format('MMMM Do YYYY, h:mm a'),
            replyUserId: this.state.currentUserId,  // Update with current user Id
            replyUserNickName: this.state.currentUserNickName
        });

        // Call function to get all replies and post on the question page
        this.handleGetAllReplies();

    } // End of handleReplyFormSubmit()



    // Method that deletes a particular reply from reply table 
    // And also deletes the replyId from Question table's repliesObject[]
    handleDeleteReply = (replyIdToBeDeleted) => {

        console.log("Inside handleDeleteReply()");

        removeReply(replyIdToBeDeleted)
            .then(() => {

                // Now update Question table by deleting the replyId from repliesObject[]
                console.log("repliesObject: " + this.state.repliesObject);

                let updatedRepliesObject = [];
                this.state.repliesObject.forEach(replyId => {
                    if (replyId !== replyIdToBeDeleted) {
                        updatedRepliesObject.push(replyId);
                    }
                });
                console.log("updatedRepliesObject: " + updatedRepliesObject);

                this.setState({
                    repliesObject: updatedRepliesObject
                });

                // Call PUT method for updating the question with new reply object
                this.handleUpdateQuestion(this.state.id,
                    {
                        question: this.state.question,
                        quesDescription: this.state.quesDescription,
                        userTags: this.state.userTags,
                        repliesObject: this.state.repliesObject,
                        viewCount: this.state.viewCount,
                        userId: this.state.userId,
                        dateAdded: this.state.dateAdded,
                        quesNickName: this.state.quesNickName
                    });

                    // Call function to get all replies and post on the question page
                    // this.handleGetAllReplies();

            })
            .catch(err => {
                console.log(err);
                showToastifyAlert("Delete Reply Failed!", "error");
            });
    }



    // Method that edits a particular reply in reply table
    handleSaveEdittedReply = (postData) => {
        console.log("Inside handleSaveEdittedReply()");


        // Reset flags replated to editing reply
        this.setState({
            enableReplyCommentBox: false,
            saveEditReplyBtnToggle: false,
            editedReply: ""
        })

        let updatedReplyObj = {
            reply: postData.reply, //Only value that is updating
            replyThumbsUpCount: this.state.replyThumbsUpCount,
            replyThumbsDownCount: this.state.replyThumbsDownCount,
            replyUserId: this.state.replyUserId,
            replyAddedOn: this.state.replyAddedOn,
            replyUserNickName: this.state.replyUserNickName
        };

        // Update the reply in the database
        updateReply(postData.id, updatedReplyObj)
            .then(({ data: replyData }) => {

                showToastifyAlert("Reply Updated successfully!", "success");
                // Call function to get all replies and post on the question page
                this.handleGetAllReplies();

            })
            .catch(err => {
                console.log(err);
                showToastifyAlert("Failed updating the reply/comment!", "error");
            });


    } // End of handleSaveEdittedReply()



    // This function is triggered when user wants to edit a particular reply
    handleEditReplyBtnCkicked = (replyIdToBeEdited, oldReply) => {
        console.log("Inside handleEditReplyBtnCkicked()");

        this.setState({
            enableReplyCommentBox: true,
            saveEditReplyBtnToggle: true,
            editedReply: oldReply
        })

    } // End of handleEditReplyBtnCkicked()


    
    
    // Method that updates the reply thumbsup count field of the reply schema whenever 
    // a user clicks on the thumbsup button on reply
    handleThumbsUpCount = (replyId, updatedThumbsUpCountObj) => {

        console.log("Inside handleThumbsUpCount()");

        updateReply(replyId, updatedThumbsUpCountObj)
            .then(({ data: replyData }) => {
                // Call function to get all replies and post on the question page
                this.handleGetAllReplies();
            })
            .catch(err => {
                console.log(err);
                showToastifyAlert("Thumbs Up Count Failed to Update!", "error");
            });

    } // End of handleThumbsUpCount()


    // Method that updates the reply thumbsdown count field of the reply schema whenever 
    // a user clicks on the thumbsdown button on reply
    handleThumbsDownCount = (replyId, updatedThumbsDownCountObj) => {

        console.log("Inside handleThumbsDownCount()");

        updateReply(replyId, updatedThumbsDownCountObj)
            .then(({ data: replyData }) => {

                // Call function to get all replies and post on the question page
                this.handleGetAllReplies();
            })
            .catch(err => {
                console.log(err);
                showToastifyAlert("Thumbs Down Count Failed to Update!", "error");
            });

    } // End of handleThumbsDownCount()


    // Calculate when btn should be visible 
    showEditQuestionButton = () => {

        return( 
            this.state.id   //if question id exists
            && (this.state.currentUserId === this.state.userId) //if current user = user who created the ques
            && this.state.setQuesInputDisabled   //ques i/p box disabled status
        ) 
        ? true : false
    }

    showCommentReplyBox = () => {
        return ( 
            this.state.id   //if question id exists
            && this.state.setQuesInputDisabled   //ques i/p box disabled status
        ) 
        ? true : false
    }

    showUpdateQuestionBtn = () => {

        let showPostQuestion = false;

        if(this.props.location.state) {
            showPostQuestion = this.props.location.state.showPostQuestion;
        }

        return ( 
            this.state.id   //if question id exists
            && (this.state.currentUserId === this.state.userId) //if current user = user who created the ques
            && !this.state.setQuesInputDisabled   //ques i/p box disabled status
            && !showPostQuestion //If Post Question is not visible the show Update Question
        ) 
        ? true : false
    }

    showPostQuestionBtn = () => {
        
        let showPostQuestion = false;

        if(this.props.location.state) {
            // console.log(this.props.location.state.showPostQuestion);
            showPostQuestion = this.props.location.state.showPostQuestion;
        }

        return ( 
            !this.state.id   //if question id exists
            && showPostQuestion //If Post Question is not visible the show Update Question
        ) 
        ? true : false
    }




    /* *************************************************************************************
     *  render function starts here
     * *************************************************************************************/

    render() {

        console.log("Inside AddUpdateQuestion---------------");
        console.log("this.state :: ");
        console.log(this.state);


        // let showPostQuestion = false;
        // if(this.props.location.state) {
        //     // console.log(this.props.location.state.showPostQuestion);
        //     showPostQuestion = this.props.location.state.showPostQuestion;
        // }



        return (
            <React.Fragment>

                <AppHeader />

                <div className="row container-fluid mt-5">

                    {/* Left navigation Bar */}
                    <div className="col-2"
                        style={{
                            borderRight: "5px solid red"
                        }}>
                        <Navbar />
                    </div>


                    {/* Questions & Reply Window */}
                    <div className="col-10">

                        {/* Start Form Window */}
                        <form onSubmit={this.handleFormSubmit}>

                            <div className="row">
                                <div className="col-8" style={{ borderRight: "1px solid grey" }}>

                                    {/* Handle submit button text ---------------------------------------- */}
                                    <button
                                        type="button"
                                        className="btn btn-outline-info btn-dark float-right mb-2"
                                        onClick={this.handleResetQuesInputDisabled} // Reset setQuesInputDisabled=false
                                        style={{ visibility: this.showEditQuestionButton() ? 'visible' : 'hidden' }}
                                        data-toggle="tooltip" data-placement="top" title="Edit Question"
                                    >
                                        <i className="fa fa-user-edit"></i>
                                    </button>


                                    {/* Take user question field ---------------------------------------- */}
                                    <div className="form-group">
                                        <label htmlFor="question"><strong>Question Title</strong></label>
                                        <input
                                            type="text"
                                            onChange={this.handleInputChange}
                                            value={this.state.question}
                                            name="question"
                                            placeholder="What is..."
                                            className="form-control"
                                            disabled={(this.state.id && this.state.setQuesInputDisabled) ? (true) : (false)}
                                        />
                                    </div>

                                    {/* Take user question description field ---------------------------- */}
                                    <div className="form-group">
                                        <label htmlFor="quesDescription"><strong>Description</strong></label>
                                        <textarea
                                            onChange={this.handleInputChange}
                                            value={this.state.quesDescription}
                                            name="quesDescription"
                                            placeholder="Describe your question with code (if required) here ..."
                                            className="form-control"
                                            style={{ height: '200px' }}
                                            disabled={(this.state.id && this.state.setQuesInputDisabled) ? (true) : (false)}
                                        >
                                        </textarea>
                                    </div>

                                    <label 
                                        htmlFor="userName" 
                                        className="mt-1 ml-2 mb-2 row"
                                        style={{
                                            visibility: (this.state.id && this.state.setQuesInputDisabled) ? 
                                                'visible' : 'hidden'
                                        }}
                                    >
                                        <small className="text-info">
                                            posted by <span className="font-weight-bold">{this.state.quesNickName}</span> on <span className="font-weight-bold">{this.state.dateAdded}</span>
                                        </small>
                                    </label>


                                    {/* All user replies will be populated here */}
                                    {/* replylist => contains all replies from DB for this ques */}
                                    {
                                        (this.state.replylist.length > 0) ? (
                                            this.state.replylist.map(replyData => {
                                                return (
                                                    <ShowAllReplies
                                                        id={replyData._id}
                                                        replyObject={replyData}
                                                        
                                                        value={this.state.editedReply   ? 
                                                                this.state.editedReply : replyData.reply
                                                        }
                                                        name="editedReply"

                                                        handleGetAllReplies={this.handleGetAllReplies}
                                                        handleThumbsUpCount={this.handleThumbsUpCount}
                                                        handleThumbsDownCount={this.handleThumbsDownCount}
                                                        handleDeleteReply={this.handleDeleteReply}
                                                        handleEditReplyBtnCkicked={this.handleEditReplyBtnCkicked}
                                                        handleSaveEdittedReply={this.handleSaveEdittedReply}
                                                        enableReplyCommentBox={this.state.enableReplyCommentBox}
                                                        saveEditReplyBtnToggle={this.state.saveEditReplyBtnToggle}
                                                        currentUserId={this.state.currentUserId}
                                                        handleInputChange={this.handleInputChange}
                                                    />
                                                )
                                            })
                                        ) : ("")
                                    }


                                    {/* Reply Comment box */}
                                    {
                                        // (this.state.id && this.state.setQuesInputDisabled) ? (
                                        this.showCommentReplyBox() ? (
                                            <UserReply
                                                handleInputChange={this.handleInputChange}
                                                value={this.state.reply}
                                                name="reply"
                                                handleReplyFormSubmit={this.handleReplyFormSubmit}
                                                userLoggedIn={this.state.userLoggedIn}
                                            />
                                        ) : (
                                                ""
                                            )
                                    }
                                </div>


                                <div className="col-4 container-fluid">

                                    <div className="row">

                                        <div className="col-12">
                                            <Link
                                                to={{
                                                    pathname: "/add",
                                                    state: { showPostQuestion: true }
                                                }}
                                                className="btn btn-sm btn-block btn-warning mb-2 float-right"
                                                onClick={this.handleAskQuestion}
                                            >
                                                <strong>Ask New Question</strong>
                                            </Link>
                                        </div>

                                        <div className="col-12">

                                            {/* Handle tags section -------------------------------------------- */}
                                            <div className="form-group mt-3">
                                                <label htmlFor="tags">
                                                    <strong>Tags in which the question lies...</strong>
                                                </label>

                                                <input
                                                    className="ml-3"
                                                    list="categories"
                                                    name="currentTag"
                                                    onChange={this.handleTagSelection}
                                                    placeholder="Select a tag..."
                                                    disabled={(this.state.id && this.state.setQuesInputDisabled) ? (true) : (false)}
                                                />

                                                <datalist id="categories">
                                                    {
                                                        // Call function to generate the dataList
                                                        this.generateDataList()
                                                    }
                                                </datalist>

                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-info ml-3"
                                                    onClick={this.handleTagAddition}
                                                    disabled={(this.state.id && this.state.setQuesInputDisabled) ? (true) : (false)}
                                                >
                                                    Save Tag
                                                </button>

                                            </div>

                                            {/* Div that shows the already selected userTags */}
                                            <div 
                                                className="my-3 p-3" 
                                                style={{ border: "2px dotted lightblue" }}
                                            >
                                                {   this.showUserTags()     }
                                            </div>
                                        </div>
                                    </div>



                                </div>
                            </div>


                            {/* Handle submit button text ---------------------------------------- */}
                            <div className="row">
                                <div className="col-12">
                                    <button
                                        type="submit"
                                        className="btn btn-outline-info btn-dark"
                                        style={{visibility: this.showUpdateQuestionBtn() ? 'visible' : 'hidden'}}
                                    >
                                        Update Question
                                    </button>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <button
                                        type="submit"
                                        className="btn btn-outline-info btn-dark float-left"
                                        style={{ visibility: this.showPostQuestionBtn() ? 'visible' : 'hidden' }}
                                    >
                                        Post Question
                                    </button>
                                </div>
                            </div>



                        </form>
                        {/* End Form Window */}



                    </div>
                    {/* End Questions & Reply Window */}

                </div>


                <Footer />
            </React.Fragment>
        )
    }
}


export default AddUpdateQuestion;
