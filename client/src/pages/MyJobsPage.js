import React, { Component } from 'react';
import { Link } from 'react-router-dom';


// Importing custom Components
import AppHeader from '../components/AppHeader/AppHeader';
import Navbar from '../components/Navbar/Navbar';
import Footer from "../components/Footer/Footer";

import { showToastifyAlert } from '../utils/alertAPI';
import { getSavedJobs, deleteSavedJob } from '../utils/jobsAPIs';



class MyJobsPage extends Component {

    state = {
        accessToken: localStorage.getItem('accessToken'), // get access token from localStorage
        userLoggedIn: false,
        mySavedJobs: []
    };

    // use component did mount to get all questions on load
    componentDidMount() {
        this.setState({
            userLoggedIn: (this.state.accessToken) ? true : false
        })
        this.handleGetSavedJobs();
    }

    // This function will get all the saved jobs fom user database
    handleGetSavedJobs = () => {

        console.log("Inside MyJobsPage -> getSavedJobsFromDB()");

        getSavedJobs()
            .then(({data: jobsData}) => {
                // console.log(jobsData);
                
                this.setState({
                    mySavedJobs: jobsData
                })

            })
            .catch(err => {
                console.log(err);
                showToastifyAlert("You do not have any saved job!", "info");
            });

    } // End of handleGetSavedJobs()



    // Function that triggers when user wants to delete a saved job
    handleDeleteSavedJob = (jobId) => {

        console.log("Inside AllJobsPage -> handleDeleteSavedJob()");
        // console.log("jobId to be deleted is = " + jobId);

        deleteSavedJob(jobId)
            .then(({data: jobsData}) => {
                // console.log("22222222");
                // console.log(jobsData);
                
                this.handleGetSavedJobs();

            })
            .catch(err => {
                console.log(err);
                showToastifyAlert("You do not have any saved job!", "info");
            });

    } //End of handleDeleteSavedJob()



    // Function called to display all scraped jobs
    displayEachScrapedJob = (jobInfo) => {

        // console.log("Inside AllJobsPage -> displayEachScrapedJob()");
        // console.log(jobInfo);

        let optionalDataString = "";

        if (jobInfo.company)
            optionalDataString += jobInfo.company;

        if (jobInfo.location)
            optionalDataString += " | " + jobInfo.location;

        if (jobInfo.salary)
            optionalDataString += " | " + jobInfo.salary;

        if (jobInfo.posted)
            optionalDataString += " | " + jobInfo.posted;

        return (
            <li 
                className="list-group-item list-group-item-action flex-column align-items-start border border-info border-top-1" 
                data={jobInfo}
            >

                <div className="row w-100">
                    <h6 className="col-11 py-0">{jobInfo.jobTitle}</h6>
                    <button
                        type="button"
                        className="btn col-1 p-0"
                        data="jobInfo"
                        onClick={() => this.handleDeleteSavedJob(jobInfo._id)}
                    >
                        <i className="fas fa-trash-alt text-danger"></i>
                    </button>
                </div>

                <div className="d-flex w-100 justify-content-between text-info">
                    <small>{optionalDataString}</small>
                </div>

                <div className="d-flex w-100 justify-content-between">
                    <p>{jobInfo.description}</p>
                </div>
            </li>
        )

    } // End of displayEachScrapedJob()




    // create a listgroup component that receives the list of scraped jobs
    listGroupForAllJobs = () => {

        // console.log("Inside AllJobsPage -> listGroupForAllJobs()");
        // console.log("allScrapedJobs.length: " + allScrapedJobs.length);

        return (
            <div className="list-group">
                {
                    (this.state.mySavedJobs.length > 0) ? (
                        this.state.mySavedJobs.map(jobInfo => {
                            return (
                                this.displayEachScrapedJob(jobInfo)
                            )
                        })
                    ) : (
                            <h2>No saved jobs to display 😒</h2>
                        )
                }
            </div>
        )

    } // End of listGroupForAllJobs()




    /* *************************************************************************************
     *  render function starts here
     * *************************************************************************************/

    render() {
        console.log("Inside MyJobsPage.js render()");

        // if (!this.state.accessToken) {
        //     return showToastifyAlert("You need to be logged in see your saved jobs!", "error");
        // }



        return (

            <React.Fragment>

                <AppHeader />

                <div className="row container-fluid bg-info my-1 px-3 ml-0 mr-0">
                    <div className="col-12">
                        <h4 className="text-light mt-2">Jobs</h4>
                    </div>
                    <div className="col-12" style={{ fontSize: "15px", lineHeight: "1em" }}>
                        <p>My Saved Jobs</p>
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

                    {/* List all jobs here */}
                    {/* <div className="col-10"> */}
                    <div className="col-10 border-info" style={{ height: "440px", overflowY: "scroll"}}>
                        {
                            this.listGroupForAllJobs()
                            
                        }
                    </div>
                </div>

                <Footer />

            </React.Fragment>
        )
    }
}

export default MyJobsPage;

