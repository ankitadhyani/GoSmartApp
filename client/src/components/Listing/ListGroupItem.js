import React from 'react';
import { Link } from 'react-router-dom';


// create list group item (<li>) from props
function ListGroupItem(props) {

  return (
      <li className="list-group-item list-group-item-action ">
        <div className="d-flex w-100 justify-content-between">
          <h5 className="mb-1">{props.question}</h5>
        </div>
        <p className="mb-1">{props.dateAdded}</p>

        <Link 
          to={`/update/${props.id}`} 
          className="btn btn-warning btn-sm m-1">
            Edit Question
        </Link>

        <button 
          className="btn btn-danger btn-sm m-1" 
          onClick={() => props.handleDeleteQuestion(props.id)}>
            Remove This Question
        </button>

      </li>
  )

}

export default ListGroupItem;