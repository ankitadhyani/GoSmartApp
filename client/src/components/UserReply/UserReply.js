/* ****************************************************************************************************
 * Component: UserReply
 * This component is getting called from AddUpdateQuestion.js file to populate the Reply/Comment Box
 * ****************************************************************************************************/

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
                        placeholder="Write your answer here ... [Be sure to be logged In before posting]"
                        className="form-control"
                        style={{ height: '150px', backgroundColor: "rgb(230, 247, 247)" }}
                    >
                    </textarea>
                </div>

                <button 
                    type="button" 
                    className="btn btn-dark" 
                    onClick={props.handleReplyFormSubmit}
                >
                    Post Reply
                </button>


            </form>
        </div>
    )
}

export default UserReply;