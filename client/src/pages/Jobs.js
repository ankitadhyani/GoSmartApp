import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Importing custom components
import ShowJobs from '../components/ShowJobs/ShowJobs';

// Importing APIs from utils
import { getScrapedJobsByLoc } from '../utils/scrapedJobsAPI';
import { getUserProfile } from '../utils/userAPIs';



class Jobs extends Component {

    state = {
        accessToken: localStorage.getItem('accessToken'), // get access token from localStorage
        userLoggedIn: false,
        location: "New York, NY",
        topFiveScrapedJobs: [],
        // allScrapedJobs: [],
        retrievedScrapedJobs: false
    };


    // use component did mount to get all questions on load
    componentDidMount() {
        // console.log("Inside componentDidMount -> Jobs.js");

        this.setState({
            userLoggedIn: (this.state.accessToken) ? true : false
        })

        // this.setStatesValuesWhenUserLogsIn();

        console.log("Scraping Jobs started---------");
        // Get all scraped jobs function is called by default with default location of "New York, NY"
        this.handleGetScrapedJobsByLoc(this.state.location, () => {
            console.log("Scraping Jobs done---------");
            this.setState({
                retrievedScrapedJobs: true
            })
        });

    } // End of componentDidMount()



    // Method to get all scraped jobs from Dice and Indeed
    handleGetScrapedJobsByLoc = (location) => {

        getScrapedJobsByLoc(location)
            .then(({ data: scrapedJobsData }) => {

                let tempTopFiveScrapedJobs = [];
                // Get only 1st 5 jobs to be displayed on the HomePage 
                // rest of the jobs will be displayed on All Jobs Page
                for (let i = 0; i < 5; i++) {
                    // console.log(scrapedJobsData[i]);
                    tempTopFiveScrapedJobs.push(scrapedJobsData[i]);
                }

                this.setState({
                    topFiveScrapedJobs: tempTopFiveScrapedJobs,
                    // allScrapedJobs: scrapedJobsData,
                    retrievedScrapedJobs: true
                })
            })
            .catch(err => console.log(err));

    } // End of getQuestions()


    


    /* *************************************************************************************
     *  render function starts here
     * *************************************************************************************/


    render() {

        console.log("Inside Jobs.js render()");
        console.log("this.state ==============");
        console.log(this.state);


        return (
            <React.Fragment>

                <div className="">
                {
                    (!this.state.retrievedScrapedJobs) ? 
                    (
                        <img 
                            src='/images/loadingGif.gif'
                            alt="Loading jobs..."
                        />
                    ) : 
                    (
                        <div>
                            { console.log("Executing div with jobs info----------> ") }
                            {/* Header */}
                            <header className="row pt-3">
                                <div className="col-12">
                                    <h3 className="text-center">Job Opportunities</h3>
                                </div>

                                <div className="col-12">
                                    <h6 className="text-center">
                                        <i className="fas fa-map-marker-alt text-success"></i> New York, NY
                                    </h6>
                                </div>

                                <div className="col-12">
                                    <Link
                                        to={{
                                            pathname: "/jobs",
                                            state: {
                                                // allScrapedJobs: this.state.allScrapedJobs,
                                                // originPage: "Jobs"
                                            }
                                        }}
                                        className="text-center"
                                    >
                                        <h6>View More Jobs</h6>
                                    </Link>
                                </div>
                            </header>

                            {/* List few jobs here  */}
                            <div className="row">
                                <div className="col-12 mt-0 ml-2">

                                    <div 
                                        className="list-group" 
                                        style={{ 
                                            width:"100%", height: "350px", 
                                            border:"1px solid grey", borderRadius: "5px",
                                            overflowY: "scroll"
                                        }}
                                    >
                                        
                                        <ShowJobs
                                            topFiveScrapedJobs={this.state.topFiveScrapedJobs}
                                        />  
                                    </div>

                                </div>
                            </div>

                        </div>
                    )
                }


                                        
                </div>

            </React.Fragment>
        )
    }
    
}

export default Jobs;

