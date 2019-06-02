import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import ListGroup from '../components/Listing/ListGroup';

import { getAllQuestions, removeQuestion } from '../utils/questionAPIs';



class Questions extends Component {

    state = {
        questionlist: []
    };


    // use component did mount to get all questions on load
    componentDidMount() {
        this.getQuestions();
    }

    // Method to get all questions
    getQuestions = () => {
        getAllQuestions()
            .then(({ data: dbQuestionData }) => this.setState({ questionlist: dbQuestionData }))
            .catch(err => console.log(err));
    }


    // Method to remove a question when user clicks on button to remove it
    handleDeleteQuestion = (questionId) => {
        removeQuestion(questionId)
            .then(this.getQuestions)
            .catch(err => console.log(err));
    }


    render(props) {
        console.log("Question.js ----> " + props);

        return (
            <React.Fragment>

                {/* Header */}
                <header className="row p-3" style={{ borderBottom: "2px solid black" }}>
                    <div className="col-6">
                        <h3>Top Questions</h3>
                    </div>
                    <div className="col-6">
                        <Link
                            to={`/add`}
                            className="btn btn-outline-info btn-dark float-right"
                        >
                            <strong>Ask Question</strong>
                        </Link>
                    </div>
                </header>


                {/* List all questions here */}
                <div className=""
                    style={{
                        height: "400px",
                        overflowY: "scroll"
                    }}>
                    <ListGroup
                        questionlist={this.state.questionlist}
                        handleDeleteQuestion={this.handleDeleteQuestion}
                        // nickName={props.nickName}
                        nickName={"Ankita"}
                    />
                </div>
                
                {/* Show View all questions button iff we have atleast 1 question */}
                {
                    // (this.state.questionlist.length > 0 && props.originPage==="HomePage") ?
                    (this.state.questionlist.length > 0) ?
                    (           
                        <Link
                            to={`/questions`}
                            className="btn btn-block btn-outline-info btn-dark align-items-end text-center"
                            questionlist={this.state.questionlist}
                            handleDeleteQuestion={this.handleDeleteQuestion}
                        >
                            <strong>View All Questions</strong>
                        </Link>   

                    ) :
                    ( "" )
                }


            </React.Fragment>
        )
    }
}

export default Questions;

