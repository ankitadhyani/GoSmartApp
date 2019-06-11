import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import './Navbar.css';




class Navbar extends Component {

    state = {
        homePageSelected: true,
        questionPageSelected: false,
        tagPageSelected: false,
        userPageSelected: false,
        jobsPageSelected: false
    };



    handleNavigationSelection = (pageSelected) => {

        console.log("handleNavigationSelection ----> " + pageSelected);
        
        // Initially Set all states to false 
        let homePageSelected = false;
        let questionPageSelected = false;
        let tagPageSelected = false;
        let userPageSelected = false;
        let jobsPageSelected = false;


        // Turn the selcted page on
        switch(pageSelected) {
            case "home": 
                homePageSelected = true;
                break;

            case "questions": 
                questionPageSelected = true;
                break;

            case "tags": 
                tagPageSelected = true;
                break;

            case "allusers": 
                userPageSelected = true;
                break;   

            case "jobs": 
                jobsPageSelected = true;
                break;             
        }
        
        this.setState({
            homePageSelected: homePageSelected,
            questionPageSelected: questionPageSelected,
            tagPageSelected: tagPageSelected,
            userPageSelected: userPageSelected,
            jobsPageSelected: jobsPageSelected
        });

    } // End of pageSelected()




    // create a function to export a AppHeader component
    render() {
        
        console.log("Navbar component - >  render");
        console.log(this.state);
        

        return (
            
            <React.Fragment>

                <nav className="nav flex-column">

                    {/* -------------- Go Home --------------  */}

                    <NavLink 
                        to="/"
                        className={this.state.homePageSelected ? 
                            "nav-link navbar-brand text-dark border-left border-danger cLeftRedBorder" : 
                            "nav-link navbar-brand text-secondary border-left border-white cLeftWhiteBorder" 
                        }
                        onClick={ () => this.handleNavigationSelection("home") }
                    >
                        HOME
                    </NavLink>


                    {/* -------------- Go To Questions Page --------------  */}
                    <NavLink 
                        to={{
                            pathname: "/questions", 
                            state: { originPage: "Navbar" }
                        }} 
                        className={this.state.questionPageSelected ? 
                            "nav-link navbar-brand text-dark border-left border-danger cLeftRedBorder" : 
                            "nav-link navbar-brand text-secondary border-left border-white cLeftWhiteBorder" 
                        }
                        onClick={ () => this.handleNavigationSelection("questions") }
                    >
                        Questions
                    </NavLink>


                    {/* -------------- Go To All Tags Page --------------  */}
                    <NavLink 
                        to="/tags" 
                        className={this.state.tagPageSelected ? 
                            "nav-link navbar-brand text-dark border-left border-danger cLeftRedBorder" : 
                            "nav-link navbar-brand text-secondary border-left border-white cLeftWhiteBorder" 
                        }
                        onClick={ () => this.handleNavigationSelection("tags") }
                    >
                        Tags
                    </NavLink>


                    {/* Go To All Users Page */}
                    <NavLink 
                        to="/allusers" 
                        className={this.state.userPageSelected ? 
                            "nav-link navbar-brand text-dark border-left border-danger cLeftRedBorder" : 
                            "nav-link navbar-brand text-secondary border-left border-white cLeftWhiteBorder" 
                        }
                        onClick={ () => this.handleNavigationSelection("allusers") }
                    >
                        Users
                    </NavLink>


                    {/* -------------- Go To Jobs Page --------------  */}
                    <NavLink 
                        to={{
                            pathname: "/jobs", 
                            state: { originPage: "Navbar" }
                        }} 
                        className={this.state.jobsPageSelected ? 
                            "nav-link navbar-brand text-dark border-left border-danger cLeftRedBorder" : 
                            "nav-link navbar-brand text-secondary border-left border-white cLeftWhiteBorder" 
                        }
                        onClick={ () => this.handleNavigationSelection("jobs") }
                    >
                        Jobs
                    </NavLink>


                </nav>

            </React.Fragment>
        )
    }
}

export default Navbar;