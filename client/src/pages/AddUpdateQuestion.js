import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';

// Importing custon Components
import AppHeader from '../components/AppHeader/AppHeader';
import Registration from '../components/Registration/Registration';
import Navbar from '../components/Navbar/Navbar';
import Footer from "../components/Footer/Footer";


// Importing APIs
import { getAllQuestions, getQuestionById, createQuestion, updateQuestion, removeQuestion } from '../utils/questionAPIs';


var moment = require('moment');


class AddUpdateQuestion extends Component {

    state = {
        id: "",
        question: "",
        quesDescription: "",
        userTags: [],
        repliesObject: [],
        viewCount: 0,
        userId: "",
        dateAdded: "",

        questionSaved: false,
        currentTag: ""
    };


    // use component did mount to get all questions on load
    componentDidMount() {
        // for class components use THIS.PROPS to get props 
        console.log(this.props);

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
                })
                .catch(err => console.log(err));
        }

    } //End of componentDidMount()


    // This function will trigger when user clicks on "Ask question" from updateQuestion Page
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
            currentTag: ""
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
                    questionSaved: true
                });
                // return <Redirect to="/view-update/"{this.state.id} />
            })
            .catch(err => console.log(err));
    }



    // method for updating/PUTting a question
    handleUpdateQuestion = (questionId, questionInfo) => {
        updateQuestion(questionId, questionInfo)
            .then(() => {
                alert("Question updated successfully");
                // this.setState({
                //     questionSaved: true
                // });
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
                    userTags: this.state.userTags
                });
        }
        // else just create a new question
        else {

            this.handleCreateQuestion({
                question: this.state.question,
                quesDescription: this.state.quesDescription,
                userTags: this.state.userTags,
                dateAdded: moment().format('MMMM Do YYYY, h:mm a')
                // userId: this.state.userId
            });
        }
    }



    render() {

        console.log("this.state-------------");
        console.log(this.state);

        // if question has been saved, let's redirect to the home page
        // if (this.state.questionSaved) {
        //     return <Redirect to="/view-update/"{this.state.id} />
        // }

        return (
            <React.Fragment>

                <AppHeader handleFormSwitch={this.handleFormSwitch} />

                {/* Start Form Window */}
                <div className="row container-fluid">

                    {/* Left navigation Bar */}
                    <div className="col-2"
                        style={{
                            borderRight: "5px solid red"
                        }}>
                        <Navbar />
                    </div>


                    {/* Questions Window */}
                    <div className="col-10">

                        <Link
                            to={`/add`}
                            className="btn btn-sm btn-warning mb-2 float-right"
                            onClick={this.handleAskQuestion}
                        >
                            <strong>Ask New Question</strong>
                        </Link>

                        <form onSubmit={this.handleFormSubmit}>

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
                                >
                                </textarea>
                            </div>

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
                                >
                                    Save Tag
                                </button>

                            </div>

                            {/* Div that shows the already selected userTags */}
                            <div className="my-3 p-3" style={{ border: "2px dotted lightblue" }}>
                                {
                                    this.showUserTags()
                                }
                            </div>


                            {/* Handle submit button text ---------------------------------------- */}
                            {
                                (this.state.id) ?
                                    (<button type="submit" className="btn btn-outline-info btn-dark">Update Question</button>) :
                                    (<button type="submit" className="btn btn-outline-info btn-dark">Save</button>)
                            }

                        </form>

                    </div>
                    {/* End Questions Window */}

                </div>
                {/* End Form Window */}

                <Footer />
            </React.Fragment>
        )
    }
}


export default AddUpdateQuestion;

