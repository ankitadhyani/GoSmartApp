import React, { Component } from 'react';
import { Link } from 'react-router-dom';


// Importing custom Components
import AppHeader from '../components/AppHeader/AppHeader';
import Wrapper from '../components/Wrapper/Wrapper';
import Navbar from '../components/Navbar/Navbar';
import Footer from "../components/Footer/Footer";

import { getQuestionsByTag } from '../utils/questionAPIs';

import predefinedTags from "../predefinedTags.json";


class TagsPage extends Component {

    state = {
        preDefinedTagList: predefinedTags,
        tagQuestionObj: [], //It contains an array of objects containing info about tags and respective questions
        // noOfQuestionsForATag: []
    };


    // use component did mount to get all questions on load
    componentDidMount() {
        // Get all questions
        this.handleGetQuestionsByTag();
    }


    // Method to get all questions based on tag
    handleGetQuestionsByTag = () => {

        console.log("Inside TagPage -> handleGetQuestionsByTag()");

        let tagQuestionObj = [];
        // let tempNoOfQuestionsForATag = [];
        // let index = 0;

        this.state.preDefinedTagList.map(tag => {

            let tagName = tag.name;

            let tagQuesObj = {};

            getQuestionsByTag(tagName)
            .then(({ data: questionData }) => {

                tagQuesObj[tagName] = {
                    count: questionData.length,
                    quesDocument: questionData
                }

                tagQuestionObj.push(tagQuesObj);
                // tempNoOfQuestionsForATag[index] = questionData.length;
                // index++;
            })
            .catch(err => {
                console.log(err);
            });
        })

        console.log("Tags and questions related to tags are as follows:-------- ");
        console.log(tagQuestionObj);
        console.log("-----------------------------------------------------------");

        this.setState({
            tagQuestionObj: tagQuestionObj,
            // noOfQuestionsForATag: tempNoOfQuestionsForATag
        })

    } // End of getQuestionsByTag()






    /* *************************************************************************************
     *  render function starts here
     * *************************************************************************************/

    render() {
        console.log("Inside TagsPage render()");
        // let index = 0;
        // console.log("this.state.noOfQuestionsForATag = " + this.state.noOfQuestionsForATag);

        return (
            <React.Fragment>

                <AppHeader />

                <div className="row container-fluid bg-info my-1 px-5 ml-0 mr-0">
                    <div className="col-12">
                        <h4 className="text-light mt-2">Tags</h4>
                    </div>
                    <div className="col-12" style={{fontSize: "15px", lineHeight: "1em"}}>
                        <p>A tag is a keyword or label that categorizes your question with other, similar questions. Using the right tags makes it easier for others to find and answer your question.</p>
                    </div>
                </div>

                <div className="row container-fluid mt-3 mb-5">

                    {/* Left navigation Bar */}
                    <div className="col-2"
                        style={{
                            borderRight: "5px solid red"
                        }}>
                        <Navbar />
                    </div>

                    {/* List all tags here */}
                    <div className="col-10">
                        <Wrapper>
                        {
                            
                            this.state.preDefinedTagList.map(tag => {

                                // let questionsCount = this.state.noOfQuestionsForATag[index];
                                // console.log("questionsCount = " + questionsCount);

                                return (
                                    
                                    <div className="card mb-3" style={{ width: '200px' }}>
                                        <div className="card-body text-center">
                                            
                                            <Link
                                                to={{
                                                    pathname: "/tags/questions",
                                                    state: { 
                                                        preDefinedTagList: this.state.preDefinedTagList,
                                                        tagQuestionObj: this.state.tagQuestionObj,
                                                        originPage: "TagsPage",
                                                        tagSelected: tag.name,
                                                        tagDescription: tag.note
                                                     }
                                                }}
                                                className="card-title text-info"
                                            >
                                                <strong className="text-center">{tag.name}</strong>
                                                {/* <strong className="text-center">{questionsCount}</strong> */}
                                            </Link>

                                            <p 
                                                className="card-text text-justify pt-2" 
                                                style={{fontSize: "10px", lineHeight: "1.5em", borderTop: "1px solid grey"}}
                                            >
                                                {tag.note.substring(0, 80)}...
                                            </p>

                                        </div>
                                    </div>

                                )
                            })

                        }
                        </Wrapper>
                    </div>

                </div>

                <Footer />


            </React.Fragment>
        )
    }
}

export default TagsPage;

