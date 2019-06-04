import React from 'react';



function UserReply(props) {
    return (
        <div className="mt-5">

            <form>

                <div className="form-group">
                    <label htmlFor="reply"><strong>Your Answer</strong></label>
                    <textarea
                        onChange={props.handleInputChange}
                        value={props.value}
                        name={props.name}
                        placeholder="Write your answer here ..."
                        className="form-control"
                        style={{ height: '150px', backgroundColor: "rgb(230, 247, 247)" }}
                    >
                    </textarea>
                </div>

                <button type="button" className="btn btn-dark" onClick={props.handleReplyFormSubmit}>
                    Post Reply
                </button>


            </form>
        </div>
    )
}

export default UserReply;