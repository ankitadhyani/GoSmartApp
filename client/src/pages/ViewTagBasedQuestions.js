import React, { Component } from 'react';
import { Link } from 'react-router-dom';



// Importing custom Components
import AppHeader from '../components/AppHeader/AppHeader';
import Navbar from '../components/Navbar/Navbar';
import Footer from "../components/Footer/Footer";
import ListGroup from '../components/Listing/ListGroup';


class ViewTagBasedQuestions extends Component {

    state = {
        userLoggedIn: false,
        questionlist: [],
        searchQuestion: "", // searchQuestion: "What is REST?",
        searchResultList: [],
        showSearchResult: false //=true iff user searches for a question, else =false
    };


    // use component did mount to get all questions on load
    componentDidMount() {


    }

        
    // Switch state to show different form (login vs registration)
    handleFormSwitch = (formName) => {

        const showLogin = (formName === "login") ? true : false;

        this.setState({
            showLogin
        });

    } //End of handleFormSwitch()



    /* *************************************************************************************
     *  render function starts here
     * *************************************************************************************/


    render() {

        console.log("Inside ViewTagBasedQuestions(props) page");
        console.log(this.props.location.state);
        // console.log("this.props.location.state.originPage: "+ this.props.location.state.originPage);
        console.log("this.props.location.state.tagSelected: "+ this.props.location.state.tagSelected);

        const tagQuestionObj = this.props.location.state.tagQuestionObj;
        const tagSelected = this.props.location.state.tagSelected;
        const tagDescription =  this.props.location.state.tagDescription;

        
        let noOfQuestionsForThisTag = 0;
        let taggedQuesestionsArray = [];
        let currTag = "";
        let temp = {};
        for(let i=0 ; i<tagQuestionObj.length ; i++) {

            // console.log(tagQuestionObj[i]);
            // console.log( Object.keys(tagQuestionObj[i])[0] ); 
            currTag = Object.keys(tagQuestionObj[i])[0]; // Express
            if(currTag === tagSelected) {

                //console.log( Object.values(tagQuestionObj[i])[0] ); // { count: 0 , quesDocument: []}
                temp = Object.values(tagQuestionObj[i]) [0];
                noOfQuestionsForThisTag = Object.values(temp) [0]; // value of count
                taggedQuesestionsArray = Object.values(temp) [1];  //questions array
                break; 
            }
        }
        // console.log("noOfQuestionsForThisTag = " + noOfQuestionsForThisTag);
        // console.log("Questions related to " + tagSelected + " ==== ");
        // console.log(taggedQuesestionsArray);
        


        return (
            <React.Fragment>

                <AppHeader
                    originPage={this.props.location.state.originPage}
                    handleFormSwitch={this.handleFormSwitch}
                />


                <div className="row container-fluid mt-5">

                    {/* Left navigation Bar */}
                    <div className="col-2"
                        style={{
                            borderRight: "5px solid red"
                        }}>
                        <Navbar />
                    </div>

                    {/* List all questions here */}
                    <div className="col-10">

                        {/* Header */}
                        <header className="row pt-3 pb-2">

                            <div className="col-8">
                                <h3>Questions Tagged:  <span className="text-info">{tagSelected}</span> ({noOfQuestionsForThisTag})</h3>
                            </div>

                            <div className="col-4">
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
                    
                        {/* Tag Description */}
                        <div className="row"  style={{ borderBottom: "2px solid black" }}>
                            <div className="col-12">
                                <p className="text-justify font-italic">{tagDescription}</p>
                            </div>
                        </div>

                        



                        {/* List all questions here ------------------------------- */}
                        <div className=""
                            style={{
                                height: "300px",
                                overflowY: "scroll"
                            }}>
                            <ListGroup
                                questionlist={ taggedQuesestionsArray }
                                // userLoggedIn={ this.state.userLoggedIn }
                                // handleDeleteQuestion={ this.handleDeleteQuestion }
                                // handleUpdateViewCount={ this.handleUpdateViewCount }
                            />
                        </div>

                    </div>
                </div>
                <Footer />
            </React.Fragment>
        )
    }
}

export default ViewTagBasedQuestions;