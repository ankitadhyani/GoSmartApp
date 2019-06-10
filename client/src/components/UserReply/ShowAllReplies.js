import React, { Component } from 'react';



class ShowAllReplies extends Component {

    state = {
       postId: "",
       reply: "",

       editActive: false
    }

    componentDidMount() {
        this.setState({
            postId: this.props.id,
            reply: this.props.replyObject.reply
        })
    }


    // Function that triggers when user clicks on "Thumbsup" button next to any reply
    incrementThumbsUpCount = (replyObject) => {

        let thumbsUpCount = parseInt(replyObject.replyThumbsUpCount);
        thumbsUpCount++;

        return {
            reply: replyObject.reply,
            replyThumbsUpCount: thumbsUpCount, // Updated 
            replyThumbsDownCount: replyObject.replyThumbsDownCount,
            replyUserId: replyObject.replyUserId,
            replyAddedOn: replyObject.replyAddedOn,
            replyUserNickName: replyObject.replyUserNickName
        };
    }

    // Function that triggers when user clicks on "Thumbs Down" next to any reply
    incrementThumbsDownCount = (replyObject) => {

        let thumbsDownCount = parseInt(replyObject.replyThumbsDownCount);
        thumbsDownCount++;

        return {
            reply: replyObject.reply,
            replyThumbsUpCount: replyObject.replyThumbsUpCount,
            replyThumbsDownCount: thumbsDownCount, // Updated 
            replyUserId: replyObject.replyUserId,
            replyAddedOn: replyObject.replyAddedOn,
            replyUserNickName: replyObject.replyUserNickName
        };
    }

    // Calculate when reply related buttons (edit/save/delete) should be enabled/disabled 
    enableReplyButtons = (currentUserId, replyObject)  => {

        //if current user = user who created the ques
        return (currentUserId === replyObject.replyUserId) ? false : true

    }

    handleEditReplyToggle = () => {
        this.setState({
            editActive: !this.state.editActive
        })
    }

    handleEditReplySubmit = (event) => {
        event.preventDefault();
        this.props.handleSaveEdittedReply({
            id: this.state.postId,
            reply: this.state.reply,

        })
    }

    handleInputChange = (event) => {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        });
    }


    render() {
        console.log("Inside ShowAllReplies Component");
        console.log(this.state);

        return (

            <div className="container-fluid mt-5">

                <div className="row">

                    {/* ThumbsUp ThumbsDown buttons */}
                    <div className="col-2 float-left">
                        <button
                            type="button"
                            className="btn float-left p-0 m-0"
                            onClick={() =>
                                this.props.handleThumbsUpCount(this.props.id, this.incrementThumbsUpCount(this.props.replyObject))
                            }
                            data-toggle="tooltip" data-placement="top" title="Click if solution worked for you"
                        >
                            <i className="fa fa-thumbs-up text-success btn-lg"></i>
                            <span>{this.props.replyObject.replyThumbsUpCount}</span>
                        </button>

                        <button
                            type="button"
                            className="btn float-left p-0 m-0"
                            onClick={() =>
                                this.props.handleThumbsDownCount(this.props.id, this.incrementThumbsDownCount(this.props.replyObject))
                            }
                            data-toggle="tooltip" data-placement="top" title="Click if solution did NOT work for you"
                        >
                            <i className="fa fa-thumbs-down text-danger btn-lg"></i>
                            <span>{this.props.replyObject.replyThumbsDownCount}</span>
                        </button>
                    </div>


                    {/* Reply / Comment box */}
                    <div className="col-10 btn-block">
                        <textarea
                            onChange={this.handleInputChange}
                            value={this.state.editActive ? this.state.reply : this.props.value}
                            name="reply"
                            className=""
                            style={{ height: '100px', width: "100%" }}
                            disabled={(!this.state.editActive) ? true : false}
                        >
                        </textarea>
                    </div>
                </div>

                {/* Reply User and Posted information */}
                <div className="row">
                    <div className="col-9">
                        <label htmlFor="userName" className="float-right mt-1">
                            <small>
                                posted by <span className="font-weight-bold">{this.props.replyObject.replyUserNickName}</span> on <span className="font-weight-bold">{this.props.replyObject.replyAddedOn}</span>
                            </small>
                        </label>
                    </div>


                    {/* Reply related buttons */}
                    <div className="col-3">

                        {/* Save Reply button */}
                        <button
                            type="button"
                            className="btn"
                            onClick={this.handleEditReplySubmit}
                            disabled={this.enableReplyButtons(this.props.currentUserId, this.props.replyObject) ? true : false}
                            data-toggle="tooltip" data-placement="top" title="Save Reply"
                            style={{ visibility: this.state.editActive ? 'visible' : 'hidden' }}
                        >
                            <i className="fas fa-save text-info"></i>
                        </button>


                        {/* Edit Reply button */}
                        <button
                            type="button"
                            className="btn"
                            disabled={this.enableReplyButtons(this.props.currentUserId, this.props.replyObject) ? true : false}
                            data-toggle="tooltip" data-placement="top" title="Edit Reply"
                            // style={{ visibility: !this.props.saveEditReplyBtnToggle ? 'visible' : 'hidden' }}
                            style={{ visibility: !this.state.editActive ? 'visible' : 'hidden' }}
                            onClick={() => 
                                this.handleEditReplyToggle()
                            }
                        >
                            <i className="fas fa-user-edit text-info"></i>
                        </button>


                        {/* Delete Reply button */}
                        <button
                            type="button"
                            className="btn float-right"
                            onClick={() => this.props.handleDeleteReply(this.props.id)}
                            disabled={this.enableReplyButtons(this.props.currentUserId, this.props.replyObject) ? true : false}
                            data-toggle="tooltip" data-placement="top" title="Delete Reply"
                        >
                            <i className="fa fa-trash-alt text-danger"></i>
                        </button>

                    </div>
                </div>
            </div>

        )
    }
}

export default ShowAllReplies;