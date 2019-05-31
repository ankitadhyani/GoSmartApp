import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './AppHeader.css';


// handleInputChange
// handleInputChange = event => {

//   console.log("Inside handleInputChange");
// };


// handleFormSubmit = event => {
//   event.preventDefault();

//   console.log("Inside handleFormSubmit");

// }

// create a function to export a AppHeader component
function AppHeader(props) {

  return (
    <React.Fragment>

      <div className="container-fluid sticky-top ">


        <div className={`
            row
            p-3
            jumbotron 
            ${props.fluid ? "jumbotron-fluid" : ""} 
            bg-${props.bg ? props.bg : "light"}
            text-${props.text ? props.text : "dark"}
            cJumbotron
          `}>


          {/* -------- Go Smart App Icon ---------- */}
          <div className="col-2">
            <img className="btn cGoSmartIcon"
              src='./images/GoSmart_Icon.png'
              alt="GoSmart_Icon"
              onClick={() => <Redirect to="/" />}
            />
          </div>



          {/* -------- Search Input box and button ---------- */}
          <div className="col-6 mt-4">
            {/* <form className="form-group" onSubmit={this.handleFormSubmit}> */}
            <form className="form-group">
              <div className="input-group">
                <input className="form-control p-4" type="text" name="search" placeholder="Search..."
                // onChange={this.handleInputChange}
                />

                <div className="input-group-append">
                  <button className="btn btn-lg btn-info" type="submit">
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
              className="btn btn-lg btn-outline-info"
              onClick={() => props.handleFormSwitch("login")}
            >
            <strong>Log In</strong>
            </button>
          </div>


          {/* -------- Sign Up Button ---------- */}
          <div className="col-2 mt-4">
            <button 
              type="submit" 
              className="btn btn-lg btn-info"
              onClick={() => props.handleFormSwitch("registration")}
              >
              <strong>Sign Up</strong>
            </button>
          </div>

        </div>
        {/* End of Row + Jumbotron */}


      </div>
      {/* End of container-fluid */}

    </React.Fragment >
  )
}


export default AppHeader;