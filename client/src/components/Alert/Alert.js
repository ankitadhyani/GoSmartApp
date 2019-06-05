import React, { Component } from 'react';
import "./Alert.css";


class Alert extends Component {

    state = {
        showAlert: true, //Not used
        timeElapsed: false,
        alertMessage: "" // Useless
    };

    componentDidUpdate() {
        // Start timer
        if (this.props.alertMessage && !this.state.timeElapsed) {

            setTimeout(() => {
                this.setState({
                    timeElapsed: true
                })
            }, 3000);
        }
    }

    render() {

        console.log("Inside Alert -> render()");
        console.log("this.props.alertMessage = " + this.props.alertMessage);
        console.log("this.state.timeElapsed = " + this.state.timeElapsed);
        

        // if(this.state.timeElapsed) {
        //     // Reset values
        //     this.setState({
        //         timeElapsed: false
        //     });
        // }

        


        return (

            <div
                className="container-fluid text-dark text-center p-2"
                style={{
                    backgroundColor: "rgb(255, 209, 209)",
                    position: "absolute",
                    top: "-32px",
                    left: "0px",
                    border: "1px solid red",
                    visibility: (this.props.alertMessage && !this.state.timeElapsed) ?
                        'visible' : 'hidden'
                }}
            >
                <strong><span>{this.props.alertMessage}</span></strong>

            </div>

        );
    }
}


export default Alert;
