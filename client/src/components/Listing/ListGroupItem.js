import React from 'react';
import { Link } from 'react-router-dom';


function incrementViewCount(questionObject) {

  let vc = parseInt(questionObject.viewCount);
  vc++;

  return {
    question: questionObject.question,
    quesDescription: questionObject.quesDescription,
    userTags: questionObject.userTags,
    repliesObject: questionObject.repliesObject,
    viewCount: vc,    //Updating only the view count
    userId: questionObject.userId,
    dateAdded: questionObject.dateAdded,
    quesNickName: questionObject.quesNickName
  };
}

// create list group item (<li>) from props
function ListGroupItem(props) {

  return (

    <div>
      
      <li className="row list-group-item-action" style={{ borderStyle: "none" }}>


        <div className="col-1 text-secondary pt-3 text-center">
          <div className="row">
            <div className="col-12"><i className="fa fa-eye"></i></div>
          </div>
          <div className="row">
            <div className="col-12"><span><strong>{props.questionObject.viewCount}</strong></span></div>
          </div>
          
        </div>

        <div className="col-11">

          <div className="d-flex justify-content-between">
            <Link
              to={`/view-update/${props.id}`}
              className="btn text-dark btn-link m-1"
              onClick={
                () => props.handleUpdateViewCount(props.id, incrementViewCount(props.questionObject))
              }
            >
              {props.questionObject.question}
            </Link>
          </div>
          <small className="mb-1 ml-3">
            asked by <span className="text-info font-weight-bold">{props.questionObject.quesNickName}</span> on <span className="text-info font-weight-bold">{props.questionObject.dateAdded}</span>
             
          </small>


          <div className="float-right">
            <button
              className="btn text-danger btn-sm m-1"
              onClick={() => props.handleDeleteQuestion(props.id)}
            >
              <i className="fa fa-trash-alt"></i>
            </button>
          </div>


        </div>
      </li>

      <div className="pb-2" style={{ borderBottom: "1px solid grey" }}></div>

    </div>




  )

}

export default ListGroupItem;