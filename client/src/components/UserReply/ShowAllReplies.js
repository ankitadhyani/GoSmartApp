import React from 'react';


function incrementThumbsUpCount(replyObject) {

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

function incrementThumbsDownCount(replyObject) {

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


function ShowAllReplies(props) {
    return (

        <div className="container-fluid mt-5">

            <div className="row">
                <div className="col-2 float-left">
                    <button
                        type="button"
                        className="btn float-left p-0 m-0"
                        onClick={() =>
                            props.handleThumbsUpCount(props.id, incrementThumbsUpCount(props.replyObject))
                        }
                    >
                        <i className="fa fa-thumbs-up text-success btn-lg"></i>
                        <span>{props.replyObject.replyThumbsUpCount}</span>
                    </button>

                    <button
                        type="button"
                        className="btn float-left p-0 m-0"
                        onClick={() =>
                            props.handleThumbsDownCount(props.id, incrementThumbsDownCount(props.replyObject))
                        }
                    >
                        <i className="fa fa-thumbs-down text-danger btn-lg"></i>
                        <span>{props.replyObject.replyThumbsDownCount}</span>
                    </button>
                </div>

                <div className="col-10 btn-block">
                    <textarea
                        // onChange={props.handleInputChange}
                        value={props.replyObject.reply}
                        // name={props.name}
                        className=""
                        style={{ height: '100px', width: "100%" }}
                        disabled={true}
                    >
                    </textarea>
                </div>
            </div>

            <div className="row">
                <div className="col-10">
                    <label htmlFor="userName" className="float-right mt-1">
                        <small>
                            posted by <span className="font-weight-bold">{props.replyObject.replyUserNickName}</span> on <span className="font-weight-bold">{props.replyObject.replyAddedOn}</span>
                        </small>
                    </label>
                </div>
                <div className="col-1">
                    <button 
                        type="button" 
                        className="btn float-right" 
                        onClick={() => { }}
                    >
                        <i className="fas fa-user-edit text-info"></i>
                    </button>
                </div>
                <div className="col-1">
                    <button 
                        type="button" 
                        className="btn float-right" 
                        onClick={() => props.handleDeleteReply(props.id)}
                    >
                        <i className="fa fa-trash-alt text-danger"></i>
                    </button>
                </div>
            </div>
        </div>

    )
}

export default ShowAllReplies;