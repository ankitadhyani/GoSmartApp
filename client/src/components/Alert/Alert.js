import React, { Component } from 'react';
import "./Alert.css";


class Alert extends Component {

    state = {
        showAlert: false
    };


    // Set 'showAlert' state to false whenever the component loads
    componentDidMount() {
        this.setState({
            showAlert: false
        });
    }

    // Function triggers when user clicks X to close alert 
    handleCloseAlert = () => {
        console.log("Inside handleCloseAlert()");
        this.setState({
            showAlert: false
        });
    }


    render() {
        return (
            <div
                className={`
                    mt-0
                    mb-1
                    row
                    text-center
                    jumbotron-fluid
                    bg-${this.props.bg ? this.props.bg : "success"}
                    text-${this.props.text ? this.props.text : "light"}
                `}
                style={{ visibility: this.state.showAlert ? 'visible' : 'hidden' }}
            >

                <div className="col-11">
                    <span>{this.props.message}</span>
                </div>
                <div className="col-1">
                    <i className="fas fa-times-circle text-light" onClick={this.handleCloseAlert}></i>
                </div>

            </div>

        );
    }
}


export default Alert;
