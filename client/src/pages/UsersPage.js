import React, { Component } from 'react';
import { Link } from 'react-router-dom';


// Importing custom Components
import AppHeader from '../components/AppHeader/AppHeader';
import Navbar from '../components/Navbar/Navbar';
import Wrapper from '../components/Wrapper/Wrapper';
import Footer from "../components/Footer/Footer";


import { getAllUsers } from '../utils/userAPIs';

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
                console.log("------------------------");
                console.log(userData);
                // userData.forEach( user => {
                //     console.log("user.nickName = " + user.nickName);
                // }) 
                
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

                <div className="row container-fluid bg-info my-1 px-5 ml-0 mr-0">
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
                                    
                                    <div className="card">
                                        <img className="card-img-top" src="" alt="Card image cap"/>
                                        <div className="card-body">{user.nickName}</div>
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

