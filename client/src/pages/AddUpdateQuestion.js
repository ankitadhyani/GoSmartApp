import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';

// Importing custon Components
import AppHeader from '../components/AppHeader/AppHeader';
// import Registration from '../components/Registration/Registration';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import UserReply from '../components/UserReply/UserReply';
import ShowAllReplies from '../components/UserReply/ShowAllReplies';


// Importing APIs
import { getAllQuestions, getQuestionById, createQuestion, updateQuestion, removeQuestion } from '../utils/questionAPIs';
import { getAllReplies, getReplyById, createReply, updateReply, removeReply } from '../utils/replyAPIs';


var moment = require('moment');


class AddUpdateQuestion extends Component {

    state = {
        // States that handle question
        id: "",
        question: "",
        quesDescription: "",
        userTags: [],
        repliesObject: [],
        viewCount: 0,
        userId: "",
        dateAdded: "",

        questionSaved: false,
        currentTag: "",
        setDisabled: true,
        setUpdateBtnVisibleTrue: false,
        showUserReplyCommentBox: true,

        // States that handle reply
        replyId: "",
        reply: "",
        replyThumbsUpCount: 0,
        replyThumbsDownCount: 0,
        replyAddedOn: "",
        replyUserId: "",
        replylist: []
    };


    // use component did mount to get all questions on load
    componentDidMount() {
        // for class components use THIS.PROPS to get props 
        // console.log(this.props);
        console.log("Inside AddUpdateQuestion -> componentDidMount()");

        if (this.props.match.params.id) {
            // extract id of question out of this.props.match.params.id
            const questionId = this.props.match.params.id;

            // console.log("questionId: " + questionId);

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
                        questionSaved: false,
                        currentTag: ""
                    });

                    // Call function to get all replies and post on the question page
                    this.handleGetAllReplies();


                })
                .catch(err => console.log(err));
        }

    } //End of componentDidMount()


    // This function will trigger when user clicks on "Ask question" from updateQuestion Page
    // At this tage all the state values will be reset to default except for one state 'setDisabled' = false
    handleAskQuestion = () => {

        console.log("Inside handleAskQuestion()");
        this.setState({
            id: "",
            question: "",
            quesDescription: "",
            userTags: [],
            repliesObject: [],
            viewCount: 0,
            userId: "",
            dateAdded: "",

            questionSaved: false,
            currentTag: "",
            setDisabled: false, // this will change to false
            setUpdateBtnVisibleTrue: true,
            showUserReplyCommentBox: false, // this will change to false

            // States that handle reply
            replyId: "",
            reply: "",
            replyThumbsUpCount: 0,
            replyThumbsDownCount: 0,
            replyAddedOn: "",
            replyUserId: "",

            alertMessage: "" // Stores the alert message

        });
    }




    // This function will generate the DataList for tags
    generateDataList = () => {

        console.log("Inside generateDataList()");

        const preDefinedTagList = ["Node.js", "Express", "MongoDB", "MySQL", "React", "Javascript", "REST", "HTML/CSS"];

        return (preDefinedTagList.map((tag, key) => <option value={tag} />))

    } // End of generateDataList()



    // This function triggers when a tag is selected
    handleTagSelection = event => {

        console.log("Inside handleTagSelection()");

        const { name, value } = event.target;
        console.log(name + " :: " + value);

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
    handleDeleteTag = (tag) => {
        console.log("Inside handleDeleteTag()");
        console.log(tag);

    }



    // Function that shows user selected tags on the UI
    showUserTags = () => {
        console.log("Inside showUserTags()");

        return (
            (this.state.userTags.length > 0) ?

                (this.state.userTags.map((tag, key) =>
                    <label className="m-1 p-2 btn btn-outline-info text-dark"
                        onClick={this.handleDeleteTag(tag)}
                        style={{ borderRadius: "3px" }}
                    >
                        {tag} <i className="far fa-times-circle btn" ></i>
                    </label>)
                ) :
                (<h4>Select a Tag...</h4>)
        )
    }

    // handleInputChange
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }


    // method for creating/POSTing a question
    handleCreateQuestion = questionInfo => {
        createQuestion(questionInfo)
            .then(() => {
                alert("Question created successfully");
                this.setState({
                    questionSaved: true,
                    alertMessage: "Question created successfully"
                });
            })
            .catch(err => console.log(err));
    }



    // method for updating/PUTting a question
    handleUpdateQuestion = (questionId, questionInfo) => {
        updateQuestion(questionId, questionInfo)
            .then(() => {

                alert("Question updated successfully");
                this.setState({
                    alertMessage: "Question updated successfully"
                })

                return <Redirect to="/view-update/{this.state.id}" />
            })
            .catch(err => console.log(err));
    }



    handleFormSubmit = event => {
        event.preventDefault();

        // if this.state.id exists, run update method
        if (this.state.id) {

            this.handleUpdateQuestion(this.state.id,
                {
                    question: this.state.question,
                    quesDescription: this.state.quesDescription,
                    userTags: this.state.userTags,
                    repliesObject: this.state.repliesObject,
                    viewCount: this.state.viewCount,
                    // userId: this.state.userId,
                    dateAdded: this.state.dateAdded
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
                // userId: this.state.userId,
                dateAdded: moment().format('MMMM Do YYYY, h:mm a')
            });
        }
    }


    // Function that resets disabled functionality when user clicks on Edit button
    handleReSetDisabled = () => {
        this.setState({
            setDisabled: false
        });
    }


    // method for creating/POSTing a reply to the database
    handleCreateReply = replyInfo => {
        console.log("Inside handleCreateReply()");

        createReply(replyInfo)
            .then((dbReplyData) => {

                alert("Reply created successfully");
                this.setState({
                    alertMessage: "Reply created successfully"
                })

                // Now add the reply Id to Questions table
                console.log("dbReplyData------ ");
                console.log(dbReplyData.data + " :: " + dbReplyData.data._id);

                let updatedRepliesObject = [...this.state.repliesObject, dbReplyData.data._id];
                // console.log("updatedRepliesObject: " + updatedRepliesObject);

                this.setState({
                    repliesObject: updatedRepliesObject
                });

                this.handleUpdateQuestion(this.state.id,
                    {
                        question: this.state.question,
                        quesDescription: this.state.quesDescription,
                        userTags: this.state.userTags,
                        repliesObject: this.state.repliesObject,
                        viewCount: this.state.viewCount,
                        userId: this.state.userId,
                        dateAdded: this.state.dateAdded
                    });

            })
            .catch(err => console.log(err));
    }


    // Function to get all replies for this question
    handleGetAllReplies = () => {
        console.log("Inside handleGetAllReplies()");

        // If repliesObject[] has an id
        if (this.state.repliesObject.length > 0) {

            this.state.repliesObject.forEach(replyId => {

                getReplyById(replyId)
                    .then(({ data: replyData }) => {

                        let cpyReplylist = [...this.state.replylist, replyData];

                        this.setState({
                            replylist: cpyReplylist
                        });
                    })
                    .catch(err => console.log(err));
            });

        } else {
            return;
        }

    } // End of handleGetAllReplies()



    // This function handles Reply form submission
    handleReplyFormSubmit = event => {
        event.preventDefault();

        console.log("Inside handleReplyFormSubmit()");

        this.handleCreateReply({
            reply: this.state.reply,
            replyThumbsUpCount: this.state.replyThumbsUpCount,
            replyThumbsDownCount: this.state.replyThumbsDownCount,
            replyAddedOn: moment().format('MMMM Do YYYY, h:mm a'),
            // replyUserId: this.state.replyUserId
        });

        console.log("-------------------------------------------");
        // Call function to get all replies and post on the question page
        this.handleGetAllReplies();

    } // End of handleReplyFormSubmit()







    /* *************************************************************************************
     *  render function starts here
     * *************************************************************************************/

    render() {

        console.log("this.state-------------");
        console.log(this.state);


        return (
            <React.Fragment>

                <AppHeader
                    message={this.state.alertMessage}
                // handleFormSwitch={props.handleFormSwitch}
                // onChange={props.handleInputChange}
                // handleQuestionSearch={props.handleQuestionSearch}
                />


                <div className="row container-fluid">

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
                                        onClick={this.handleReSetDisabled}
                                        style={{
                                            visibility: (this.state.id && this.state.setDisabled) ?
                                                'visible' : 'hidden'
                                        }}
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
                                            // disabled={this.state.setDisabled}
                                            disabled={(this.state.id && this.state.setDisabled) ? (true) : (false)}
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
                                            // disabled={this.state.setDisabled}
                                            disabled={(this.state.id && this.state.setDisabled) ? (true) : (false)}
                                        >
                                        </textarea>
                                    </div>

                                    {/* All user replies will be populated here */}
                                    {
                                        (this.state.replylist.length > 0) ? (
                                            this.state.replylist.map(reply => {
                                                return (
                                                    <ShowAllReplies
                                                        replyObject={reply}
                                                        handleGetAllReplies={this.handleGetAllReplies}
                                                    />
                                                )
                                            })
                                        ) : ("")
                                    }


                                    {/* Reply Comment box */}
                                    {

                                        (this.state.id && this.state.setDisabled) ? (
                                            <UserReply
                                                handleInputChange={this.handleInputChange}
                                                value={this.state.reply}
                                                name="reply"
                                                handleReplyFormSubmit={this.handleReplyFormSubmit}
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
                                                to={`/add`}
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
                                                    disabled={(this.state.id && this.state.setDisabled) ? (true) : (false)}
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
                                                    disabled={(this.state.id && this.state.setDisabled) ? (true) : (false)}
                                                >
                                                    Save Tag
                                                </button>

                                            </div>

                                            {/* Div that shows the already selected userTags */}
                                            <div className="my-3 p-3" style={{ border: "2px dotted lightblue" }}>
                                                {this.showUserTags()}
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
                                        style={{
                                            visibility: !(this.state.id && this.state.setDisabled) && !this.state.setUpdateBtnVisibleTrue ?
                                                'visible' : 'hidden'
                                        }}
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
                                        style={{ visibility: !this.state.id ? 'visible' : 'hidden' }}
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
