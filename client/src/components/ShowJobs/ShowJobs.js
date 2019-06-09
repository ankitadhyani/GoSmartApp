import React, { Component } from 'react';
import './ShowJobs.css';



// Function called to display only 1st five jobs on HomePage
function displayTopFiveJobs(props) {

    console.log("Inside ShowJobs -> displayTopFiveJobs()");

    // if(this.state.topFiveScrapedJobs.length > 0) {

        props.topFiveScrapedJobs.forEach(jobInfo => {

            console.log(jobInfo);
            console.log("jobInfo.jobTitle = " + jobInfo.jobTitle);
            console.log("jobInfo.company = " + jobInfo.company);

            return (
                <li>

                    <h5 className="mb-1 text-info">{jobInfo.jobTitle}</h5>
                    <small className="mb-1 text-info">{jobInfo.company}</small>

                </li>
            )

                
        })
        
} // End of displayTopFiveJobs()




// create a function to export a AppHeader component
function ShowJobs(props) {
    
    console.log("Inside ShowJobs.js render()");
    // console.log(props.topFiveScrapedJobs);
    // console.log(props.topFiveScrapedJobs.length);

    return (
        <React.Fragment>
        {
            (props.topFiveScrapedJobs.length > 0) ?
                
                props.topFiveScrapedJobs.map(jobInfo => {

                    // console.log(jobInfo);
                    // console.log("jobInfo.jobTitle = " + jobInfo.jobTitle);
                    // console.log("jobInfo.company = " + jobInfo.company);
        
                    return (
                        <li className="list-group-item">
                            <h6 style={{ fontSize:"15px" }}>
                                {jobInfo.jobTitle}
                            </h6>
                            <small className="text-info">{jobInfo.company}</small>
                        </li>
                    )
                })
                :
                ("No Jobs found")
        }
        </React.Fragment>
    )
}



export default ShowJobs;