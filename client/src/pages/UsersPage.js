import React, { Component } from 'react';
import { Link } from 'react-router-dom';


// Importing custom Components
import AppHeader from '../components/AppHeader/AppHeader';
import Navbar from '../components/Navbar/Navbar';
import Wrapper from '../components/Wrapper/Wrapper';
import Footer from "../components/Footer/Footer";

import { getAllUsers } from '../utils/userAPIs';

import './pages.css';



class UsersPage extends Component {

    state = {
        allUsersObj: []
    };

    // use component did mount to get all questions on load
    componentDidMount() {
        console.log("Inside UsersPage -> componentDidMount()")

        // Get data for all users
        getAllUsers()
            .then(({ data: userData }) => {
                // console.log("------------------------");
                // console.log(userData);
                
                this.setState({
                    allUsersObj: userData
                });

            })
            .catch(err => {
                console.log(err);
            });
    }

    


    /* *************************************************************************************
     *  render function starts here
     * *************************************************************************************/

    render() {
        console.log("Inside UsersPage.js render()");


        return (

            <React.Fragment>
                
                <AppHeader />

                <div className="row container-fluid bg-info my-1 px-3 ml-0 mr-0">
                    <div className="col-12">
                        <h4 className="text-light mt-2">Users</h4>
                    </div>
                    <div className="col-12" style={{fontSize: "15px", lineHeight: "1em"}}>
                        <p>View all Registered Users here</p>
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

                    {/* List all users here */}
                    <div className="col-10">
                        <Wrapper>
                        {
                            
                            this.state.allUsersObj.map(user => {

                                return (
                                    
                                    <div 
                                        className="card" 
                                        style={{ height: "100px", width:"100px", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }}
                                    >
                                            <img 
                                                className="card-img-top img-thumbnail text-center cZoomUserImage" 
                                                src="/images/confused-emoticon.jpg" 
                                                alt={user.nickName}
                                            >
                                            </img>
                                            <div className="card-body p-1">
                                                <h6 className="text-center text-info font-bold">{user.nickName}</h6>
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

export default UsersPage;

