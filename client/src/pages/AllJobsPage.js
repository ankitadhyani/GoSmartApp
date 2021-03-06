import React, { Component } from 'react';
import { Link } from 'react-router-dom';


// Importing custom Components
import AppHeader from '../components/AppHeader/AppHeader';
import Navbar from '../components/Navbar/Navbar';
import Footer from "../components/Footer/Footer";

import { showToastifyAlert } from '../utils/alertAPI';
import { saveJobToDB } from '../utils/jobsAPIs';
import { getScrapedJobsByLoc } from '../utils/scrapedJobsAPI';

import './pages.css';



class AllJobsPage extends Component {

    state = {
        accessToken: localStorage.getItem('accessToken'), // get access token from localStorage
        userLoggedIn: false,
        location: "New York, NY",
        allScrapedJobs: [],
        retrievedScrapedJobs: false
    };

    // use component did mount to get all questions on load
    componentDidMount() {

        this.setState({
            userLoggedIn: (this.state.accessToken) ? true : false
        })

        // console.log("Scraping Jobs started---------");

        // Get all scraped jobs function is called by default with default location of "New York, NY"
        this.handleGetScrapedJobsByLoc(this.state.location, () => {
            // console.log("Scraping Jobs done---------");
            this.setState({
                retrievedScrapedJobs: true
            })
        });

    }

    // handleInputChange
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };


    // Method to get all scraped jobs from Dice and Indeed
    handleGetScrapedJobsByLoc = (location) => {

        getScrapedJobsByLoc(location)
            .then(({ data: scrapedJobsData }) => {

                this.setState({
                    allScrapedJobs: scrapedJobsData
                })
            })
            .catch(err => console.log(err));

    } // End of handleGetScrapedJobsByLoc()



    //Function that saves jobs in User Profile (Database)
    //this is triggered when user clicks on 'save-job' pin button
    handleSaveJobToProfile = (jobData) => {

        console.log("Inside AllJobsPage -> handleSaveJobToProfile()");

        if (!this.state.userLoggedIn) {
            return showToastifyAlert("You need to be logged in to save the job!", "error");
        }

        saveJobToDB(jobData)
            .then(({ data: dbJobData }) => {

                return showToastifyAlert("Job saved to your profile successfully!", "success");
            })
            .catch(err => {
                console.log(err);
            });

    } // End of handleSaveJobToProfile()




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
            <div
                className="list-group-item list-group-item-action align-items-start" 
                className="border border-info border-top-1 pl-3 pt-3 cJobsListItem"
                data={jobInfo}
            >

                <div className="row w-100">
                    <h5 className="col-11 py-0">{jobInfo.jobTitle}</h5>
                    <button
                        type="button"
                        className="btn col-1 p-0"
                        data="jobInfo"
                        onClick={() => this.handleSaveJobToProfile(jobInfo)}
                        data-toggle="tooltip" data-placement="top" title="Bookmark Job Details"
                    >
                        📌
                    </button>
                </div>

                <div className="d-flex w-100 justify-content-between text-info">
                    <small>{optionalDataString}</small>
                </div>

                <div className="d-flex w-100 justify-content-between text-secondary pb-0">
                    <p className="p-0">{jobInfo.description}</p>
                </div>
            </div>
        )

    } // End of displayEachScrapedJob()




    // create a listgroup component that receives the list of scraped jobs
    listGroupForAllJobs = (allScrapedJobs) => {

        // console.log("Inside AllJobsPage -> listGroupForAllJobs()");
        // console.log("allScrapedJobs.length: " + allScrapedJobs.length);

        return (
            <div className="list-group">
                {
                    (allScrapedJobs.length > 0) ? (
                        allScrapedJobs.map(jobInfo => {
                            return (
                                this.displayEachScrapedJob(jobInfo)
                            )
                        })
                    ) : (
                            <h2>No jobs to display 😒</h2>
                        )
                }
            </div>
        )

    } // End of listGroupForAllJobs()



    // This function will take the job location preference from user to search for jobs
    handleJobLocationSearch = (event) => {
        event.preventDefault();

        console.log("Inside AllJobsPage -> handleJobLocationSearch()");
        console.log("this.state.location = " + this.state.location);

        this.setState({
            retrievedScrapedJobs: false
        })

        // Get all scraped jobs function is called now with the new location
        this.handleGetScrapedJobsByLoc(this.state.location, () => {
            this.setState({
                retrievedScrapedJobs: true
            })
        });

    } // End of handleJobLocationSearch()




    /* *************************************************************************************
     *  render function starts here
     * *************************************************************************************/

    render() {
        console.log("Inside AllJobsPage.js render()");
        console.log(this.state.allScrapedJobs);



        return (

            <React.Fragment>

                <AppHeader />

                <div className="row container-fluid bg-info my-1 px-3 ml-0 mr-0">
                    <div className="col-8">
                        <h4 className="text-light mt-2">Jobs</h4>
                    {/* </div> */}
                    {/* <div className="col-12" style={{ fontSize: "15px", lineHeight: "1em" }}> */}
                        <p>Show all the Full Stack Web Development Jobs</p>
                    </div>

                    <div className="col-4 mt-3">
                        <form className="form-group" onSubmit={this.handleJobLocationSearch}>
                            <div className="input-group">
                                <input
                                    className="form-control p-4"
                                    type="text"
                                    name="location"
                                    value={this.state.location}
                                    placeholder="Search Location..."
                                    onChange={this.handleInputChange}
                                />
                            </div>
                        </form>
                    </div>


                </div>

                <div className="row container-fluid mt-4 mb-5">

                    {/* Left navigation Bar */}
                    <div className="col-2"
                        style={{
                            borderRight: "5px solid red"
                        }}>
                        <Navbar />
                    </div>

                    {/* List all jobs here */}
                    <div 
                        className="col-10 border-info" 
                        style={{ height: "440px", overflowY: "scroll" }}
                    >
                        {
                            this.state.allScrapedJobs.length ?
                                (
                                    this.listGroupForAllJobs(this.state.allScrapedJobs)

                                ) : (

                                    <img
                                        src='/images/loadingGif.gif'
                                        alt="Loading jobs..."
                                    />
                                )
                        }
                    </div>
                </div>

                <Footer />

            </React.Fragment>
        )
    }
}

export default AllJobsPage;

