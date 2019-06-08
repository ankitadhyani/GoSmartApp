import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';

import './AppHeader.css';
import Dropdown from '../../components/Dropdown/Dropdown';

// Importing APIs from utils
import { getUserProfile, logOutUser } from '../../utils/userAPIs';
import { showToastifyAlert } from '../../utils/alertAPI';



class AppHeader extends Component {

  state = {
    searchQuestion: "", // Will store the question to be searched by the user
    questionAsked: false,

    // Get below states from getUserProfile()
    fullName: "",
    nickName: "",
    email: "",
    userLoggedIn: false
  };



  // use component did mount to get user Info on load
  componentDidMount() {
    // console.log(window.location);
    // for class components use THIS.PROPS to get props 
    // console.log(this.props);
    console.log("Inside AppHeader -> componentDidMount()");

    // Reset state
    this.setState({
      fullName: "",
      nickName: "",
      email: "",
      userLoggedIn: false
    });


    // Get user info and extract user nickName from user table to feed it in Question & Reply table
    // In case of error (meaning no user is logged in) the set 'userLoggedIn' state to false
    getUserProfile()
    .then(({ data: userData }) => {
        console.log("AppHeader -> getUserProfile -> userData -> ");
        console.log(userData);

        // Update state with user data
        this.setState({
            fullName: `${userData.firstName} ${userData.lastName}`,
            email: userData.email,
            nickName: userData.nickName,
            userLoggedIn: true
        });

    })
    .catch(err => {
        console.log(err);

        // Update state with user data
        this.setState({
            userLoggedIn: false
        });
    });

  } //End of componentDidMount()


  // handleInputChange
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };



  // This function triggers when user searches for a question
  handleQuestionSearch = event => {

    event.preventDefault();

    console.log("Inside AppHeader -> handleQuestionSearch()");
    console.log("this.state.searchQuestion = " + this.state.searchQuestion);

    const searchStr = this.state.searchQuestion.trim();
    console.log("searchStr trim= " + searchStr);

    if (searchStr) {
      console.log("searchStr in if()= " + searchStr); //ok
      this.setState({
        questionAsked: true
      })
    }
    else {
      alert("Search string is empty!");
      this.setState({
        alertMessage: "Search string is empty!"
      })

    }

  } //End of handleQuestionSearch()


  setStatesValuesWhenUserLogsIn = () => {

    getUserProfile()
    .then(({ data: userData }) => {
        console.log("AppHeader -> setStatesValuesWhenUserLogsIn()");
        // console.log(userData);

        // Update state with user data
        this.setState({
            fullName: `${userData.firstName} ${userData.lastName}`,
            email: userData.email,
            nickName: userData.nickName,
            userLoggedIn: true
        });

    })
    .catch(err => {
        console.log(err);

        // Update state with user data
        this.setState({
            userLoggedIn: false
        });
    });

  }





  render() {

    console.log("Inside AppHeader -> render()");
    console.log(this.state);
    console.log("Appheader -> this.props.userLoggedIn: " + this.props.userLoggedIn);

    // Call function to set states 
    if(this.props.userLoggedIn === true && this.state.userLoggedIn === false){
      this.setStatesValuesWhenUserLogsIn();
    }


    if (this.state.questionAsked === true && this.state.searchQuestion) {

      this.setState({
        questionAsked: false
      })

      return <Redirect to={{
        pathname: "/questions",
        state: { searchQuestion: this.state.searchQuestion }
      }} />
    }


    return (

      <React.Fragment>

        <div className="container-fluid sticky-top">

          <div className="row p-0 jumbotron jumbotron-fluid bg-dark text-dark mb-0 cJumbotron">

            {/* -------- Go Smart App Icon ---------- */}
            <div className="col-2 mt-0 pt-0">
              <img 
                className="btn cGoSmartIcon"
                src='/images/GoSmart_Icon.png'
                alt="GoSmart_Icon"
                onClick={() => <Redirect to="/" />}
              />
            </div>



            {/* -------- Search Input box and button ---------- */}
            <div className="col-6 mt-3">

              <form className="form-group" onSubmit={this.handleQuestionSearch}>
                <div className="input-group">
                  <input
                    className="form-control p-4"
                    type="text"
                    name="searchQuestion"
                    value={this.searchQuestion}
                    placeholder="Search question..."
                    onChange={this.handleInputChange}
                  />

                  <div className="input-group-append">
                    <button
                      className="btn btn-lg btn-info"
                      type="submit"
                    >
                      <i className="fa fa-search text-light"></i>
                    </button>
                  </div>
                </div>
              </form>

            </div>


            
            <div 
              // className={this.state.userLoggedIn ? "dropdown open btn btn-info" : ""}
              className="col-4 mt-2 d-flex justify-content-end"
              // className="col-4 mt-2"
            >
              <div 
                className="row float-right"
                style={{ visibility: !this.state.userLoggedIn ? 'visible' : 'hidden' }}
              >
                {/* -------- LogIn Button ---------- */}
                {
                  window.location.pathname === "/" ? (
                    <button
                      type="button"
                      className="btn btn-outline-info m-3"
                      onClick={() => this.props.handleFormSwitch("login")}
                    >
                      <strong>Log In</strong>
                    </button>
                  ) : (
                    <Link className="btn btn-outline-info m-3" to={{
                      pathname: "/",
                      state: {
                        showLogin: true
                      }
                    }}>
                      <strong>Log In</strong>
                    </Link>
                  )
                }


                {/* -------- Sign Up Button ---------- */}
                {
                  window.location.pathname === "/" ? (
                    <button
                      type="button"
                      className="btn btn-outline-info m-3 "
                      onClick={() => this.props.handleFormSwitch("registration")}
                    >
                      <strong>Sign Up</strong>
                    </button>
                  ) : (
                    <Link className="btn btn-outline-info m-3" to={{
                        pathname: "/",
                        state: {
                          showLogin: false
                        }
                      }}>
                      <strong>Sign Up</strong>
                    </Link>
                  )
                }

              </div>

              <div 
                className="row mt-2 mr-3 float-right"
                style={{ visibility: this.state.userLoggedIn ? 'visible' : 'hidden' }}
              >
                 {/* After user login show a button with label of user name and dropdown menu */}
                 <Dropdown 
                    fullName={this.state.fullName}
                    email={this.state.email}
                    nickName={this.state.nickName}
                />
              </div>
                

            </div>
            {/* -------- End of Sign Up Button ---------- */}

          </div>
          {/* End of Row + Jumbotron */}



        </div>
        {/* End of container-fluid */}

      </React.Fragment >
    )
  }
}

export default AppHeader;