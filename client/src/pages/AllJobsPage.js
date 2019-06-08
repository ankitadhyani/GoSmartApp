import React, { Component } from 'react';
import { Link } from 'react-router-dom';


// Importing custom Components
import AppHeader from '../components/AppHeader/AppHeader';
import Navbar from '../components/Navbar/Navbar';
import Footer from "../components/Footer/Footer";


class AllJobsPage extends Component {

    state = {
        retrievedScrapedJobs: false
    };

    // use component did mount to get all questions on load
    componentDidMount() {

    }

    // Function called to display all scraped jobs
    displayAllScrapedJobs = () => {

        console.log("Inside AllJobsPage -> displayAllScrapedJobs()");

        this.props.allScrapedJobs.forEach((jobInfo) => {

            console.log(jobInfo);

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
                        <h4 className="mb-1">jobInfo.jobTitle</h4>
                        <button 
                            type="button"
                            className="btn"
                        >
                            `📌`
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
        })
            
    } // End of displayTopFiveJobs()


    // create a listgroup component that receives props for it's styling (flush) and receives props for the list of scraped jobs
    listGroupForAllJobs = () => {

        return (
            <div className="list-group">
                {
                    (this.props.allScrapedJobs.length > 0) ? (
                        this.props.allScrapedJobs.forEach((jobInfo) => {
                            return (
                                this.displayAllScrapedJobs()
                            )
                        })
                    ) : (
                        <h2>No jobs to display 😒</h2>
                    )
                }
        
            </div>
        )
    }



    /* *************************************************************************************
     *  render function starts here
     * *************************************************************************************/

    render() {
        console.log("Inside AllJobsPage.js render()");
        console.log("----------------------------------------------------------------------");
        console.log("this.props.retrievedScrapedJobs = " + this.props.retrievedScrapedJobs);
        
        if(this.props.retrievedScrapedJobs && !this.state.retrievedScrapedJobs) {
            this.setState({
                retrievedScrapedJobs: true
            })
        }

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
                            (this.props.retrievedScrapedJobs) ? 
                                this.listGroupForAllJobs() : 
                                ""
                        }
                    </div>
                </div>

                <Footer />

            </React.Fragment>
        )
    }
}

export default AllJobsPage;

