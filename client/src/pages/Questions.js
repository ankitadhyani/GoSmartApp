import React, { Component } from 'react';
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

    // create method to get all questions
    getQuestions = () => {
        getAllQuestions()
            .then(({ data: dbQuestionData }) => this.setState({ questionlist: dbQuestionData }))
            .catch(err => console.log(err));
    }

    // create method to remove a question when user clicks on button to remove it
    handleDeleteQuestion = (questionId) => {
        removeQuestion(questionId)
            .then(this.getQuestions)
            .catch(err => console.log(err));
    }

    render() {
        return (
            <React.Fragment>
                {/* Header */}
                <header className="row p-3" style={{ borderBottom: "2px solid black" }}>
                    <div className="col-6">
                        <h3>Top Questions</h3>
                    </div>
                    <div className="col-6">
                        <button
                            type="button"
                            className="btn btn-outline-info btn-dark float-right"
                        // onClick={() => props.handleFormSubmit(props.regStatus)}
                        >
                            <strong>Ask Question</strong>
                        </button>
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
                    />
                </div>

            </React.Fragment>
        )
    }
}

export default Questions;

