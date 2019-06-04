import React from 'react';



function ShowAllReplies(props) {
    return (

        <div className="container-fluid mt-5">

            <div className="row">
                <div className="col-2 float-left">
                    <button type="button" className="btn float-left p-0 m-0" onClick={() => { }}>
                        <i className="fa fa-thumbs-up text-success btn-lg"></i>
                        <span>{props.replyObject.replyThumbsUpCount}</span>
                    </button>

                    <button type="button" className="btn float-left p-0 m-0" onClick={() => { }}>
                        <i class="fa fa-thumbs-down text-danger btn-lg"></i>
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
                <div className="col-11">
                    <label htmlFor="userName" className="float-right mt-1">
                        <small>
                            posted by "{props.replyObject.replyUserId}" on {props.replyObject.replyAddedOn}
                        </small>
                    </label>
                </div>
                <div className="col-1">
                    <button type="button" className="btn float-right" onClick={()=> {}}>
                        <i class="fas fa-user-edit text-info"></i>
                    </button>
                </div>
            </div>
        </div>

    )
}

export default ShowAllReplies;