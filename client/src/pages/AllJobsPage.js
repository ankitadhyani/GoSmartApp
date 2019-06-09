import React, { Component } from 'react';
import { Link } from 'react-router-dom';


// Importing custom Components
import AppHeader from '../components/AppHeader/AppHeader';
import Navbar from '../components/Navbar/Navbar';
import Footer from "../components/Footer/Footer";

import { showToastifyAlert } from '../utils/alertAPI';
import { saveJobToDB } from '../utils/jobsAPIs';



class AllJobsPage extends Component {

    state = {
        accessToken: localStorage.getItem('accessToken'), // get access token from localStorage
        userLoggedIn: false
    };

    // use component did mount to get all questions on load
    componentDidMount() {

        this.setState({
            userLoggedIn: (this.state.accessToken) ? true : false
        })
        
    }

    
    
    //Function that saves jobs in User Profile (Database)
    //this is triggered when user clicks on 'save-job' pin button
    handleSaveJobToProfile = (jobData) => {

        console.log("Inside AllJobsPage -> handleSaveJobToProfile()");
        // console.log("jobData -> "); console.log(jobData);


        console.log("this.state.userLoggedIn = " + this.state.userLoggedIn);
        if (!this.state.userLoggedIn) {
            return showToastifyAlert("You need to be logged in to save the job!", "error");
        }

        saveJobToDB(jobData)
            .then(({ data: dbJobData }) => {
                // console.log("99999999");
                // console.log(dbJobData);

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
            <li className="list-group-item list-group-item-action flex-column align-items-start border border-info border-top-1" data={jobInfo}>

                <div className="d-flex w-100 justify-content-between">
                    <h4 className="mb-1">{jobInfo.jobTitle}</h4>
                    <button 
                        type="button" 
                        className="btn btn-lg"
                        data="jobInfo"
                        // disabled={userLoggedIn ? false : true}
                        onClick={() => this.handleSaveJobToProfile(jobInfo)}
                    >
                        📌
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



    /* *************************************************************************************
     *  render function starts here
     * *************************************************************************************/

    render() {
        console.log("Inside AllJobsPage.js render()");
        // console.log("this.props.location.state = " + this.props.location.state.allScrapedJobs);

        let allScrapedJobs = this.props.location.state.allScrapedJobs;
        console.log("AllJobsPage -> allScrapedJobs ======> ");
        console.log(allScrapedJobs);

        return (

            <React.Fragment>
                
                <AppHeader />

                <div className="row container-fluid bg-info my-1 px-5 ml-0 mr-0">
                    <div className="col-12">
                        <h4 className="text-light mt-2">Jobs</h4>
                    </div>
                    <div className="col-12" style={{fontSize: "15px", lineHeight: "1em"}}>
                        <p>Show all the Full Stack Web Development Jobs</p>
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
                    <div className="col-10">
                        {
                            this.listGroupForAllJobs(allScrapedJobs)
                        }
                    </div>
                </div>

                <Footer />

            </React.Fragment>
        )
    }
}

export default AllJobsPage;

