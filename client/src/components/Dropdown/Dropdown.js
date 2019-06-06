import React from 'react';
import { Redirect, Link } from 'react-router-dom';

import './Dropdown.css';


class Dropdown extends React.Component {
constructor(){
 super();

 this.state = {
       displayMenu: false,
     };

  this.showDropdownMenu = this.showDropdownMenu.bind(this);
  this.hideDropdownMenu = this.hideDropdownMenu.bind(this);

};

showDropdownMenu(event) {
    event.preventDefault();
    this.setState({ displayMenu: true }, () => {
    document.addEventListener('click', this.hideDropdownMenu);
    });
  }

  hideDropdownMenu() {
    this.setState({ displayMenu: false }, () => {
      document.removeEventListener('click', this.hideDropdownMenu);
    });

  }

  render() {

    return (

        <div className="dropdown">

            <button className="btn btn-outline-info" onClick={this.showDropdownMenu}> 
                {this.props.fullName} 
            </button>

            { this.state.displayMenu ? (
                <div className="bg-light">
                        <h6 className="dropdown-header">{this.props.email}</h6>
                        <h6 className="dropdown-header text-center">({this.props.nickName})</h6>
                        <div className="dropdown-divider"></div>
                        <Link className="dropdown-item" to={{
                            pathname: "/my-profile",
                            state: {
                                // showLogin: false
                            }
                            }}>
                            My Profile
                        </Link>
                        <Link className="dropdown-item" to={{
                            pathname: "/my-questions",
                            state: {
                                // showLogin: false
                            }
                            }}>
                            My Questions
                        </Link>

                        <Link className="dropdown-item" to={{
                            pathname: "/logout",
                            state: {
                                // showLogin: false
                            }
                            }}>
                            Logout
                        </Link>
                </div>
                ):
                (
                    ""
                )
            }

       </div>

    );
  }
}

export default Dropdown;