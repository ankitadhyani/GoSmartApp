import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import './AppHeader.css';

import Alert from '../Alert/Alert';




class AppHeader extends Component {

  state = {
    searchQuestion: "", // Will store the question to be searched by the user
    questionAsked: false,
    alertMessage: "" // Stores the alert message
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


            {/* -------- LogIn Button ---------- */}
            <div className="col-2 mt-4">
              <button
                type="submit"
                className="btn btn-outline-info"
                onClick={() => this.props.handleFormSwitch("login")}
              >
                <strong>Log In</strong>
              </button>
            </div>


            {/* -------- Sign Up Button ---------- */}
            <div className="col-2 mt-4">
              <button
                type="submit"
                className="btn btn-info"
                onClick={() => this.props.handleFormSwitch("registration")}
              >
                <strong>Sign Up</strong>
              </button>
            </div>

          </div>
          {/* End of Row + Jumbotron */}

          <div className="row">
            <div className="col-12">
              <Alert message={this.state.alertMessage} />
            </div>
          </div>



        </div>
        {/* End of container-fluid */}

      </React.Fragment >
    )
  }
}

export default AppHeader;