import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import './AppHeader.css';
import { showToastifyAlert } from '../../utils/alertAPI';



class AppHeader extends Component {

  state = {
    searchQuestion: "", // Will store the question to be searched by the user
    questionAsked: false
  };


  // handleInputChange
  handleInputChange = event => {

    // console.log("Inside AppHeader -> handleInputChange()");

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



  render() {

    console.log("Inside AppHeader -> render()");


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

          <div className="row p-0 jumbotron jumbotron-fluid bg-dark text-dark cJumbotron">

            {/* -------- Go Smart App Icon ---------- */}
            <div className="col-2 mt-0 pt-0">
              <img className="btn cGoSmartIcon"
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
                    placeholder="Search..."
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
              className={this.props.userLoggedIn ? "dropdown open btn btn-info" : ""}
              className="col-4 mt-2 d-flex justify-content-end"
            >

                {/* -------- LogIn Button ---------- */}
                <button
                  type="button"
                  className="btn btn-outline-info m-3"
                  onClick={() => this.props.handleFormSwitch("login")}
                  style={{ visibility: !this.props.userLoggedIn ? 'visible' : 'hidden' }}
                >
                  <strong>Log In</strong>
                </button>


                {/* -------- Sign Up Button ---------- */}
                <button
                  type="button"
                  // className={this.props.userLoggedIn ? "dropdown open btn btn-info" : "btn btn-info"}
                  className="btn btn-info m-3"
                  onClick={() => this.props.handleFormSwitch("registration")}
                  style={{ visibility: !this.props.userLoggedIn ? 'visible' : 'hidden' }}
                >
                  <strong>Sign Up</strong>
                </button>


                {/* After user login show a button with label of user name and dropdown menu */}
                <button
                  className="btn btn-outline-info dropdown-toggle m-3"
                  type="button"
                  data-toggle="dropdown"
                  aria-haspopup="true" aria-expanded="false"
                  
                  style={{ visibility: this.props.userLoggedIn ? 'visible' : 'hidden' }}
                >
                  <span className="text-light">{this.props.fullName}</span>
                </button>

                <div className="dropdown-menu">
                  <h6 className="dropdown-header">{this.props.email}</h6>
                  <h6 className="dropdown-header">({this.props.nickName})</h6>
                  <a className="dropdown-item" href="#!">User Profile</a>
                  <a className="dropdown-item" href="#!">Logout</a>
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