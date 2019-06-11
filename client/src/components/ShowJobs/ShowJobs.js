

import React, { Component } from 'react';

import './ShowJobs.css';




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
                        <div 
                            className="list-group-item cJobsListItem"
                            // style={{ backgroundColor: "rgb(255, 222, 103)" }}
                        >
                            <h6 
                                className="text-info"
                                style={{ fontSize:"15px" }}
                            >
                                {jobInfo.jobTitle}
                            </h6>

                            <small 
                                className="text-dark font-weight-bold"
                            >
                                    {jobInfo.company}
                            </small>

                        </div>
                    )
                })
                :
                ("No Jobs found")
        }
        </React.Fragment>
    )
}



export default ShowJobs;