import React from 'react';
import { Link } from 'react-router-dom';


// create list group item (<li>) from props
function ListGroupItem(props) {

  return (

    <div>
      {/* <li className="row list-group-item list-group-item-action" style={{ borderStyle: "none" }}> */}
      <li className="row list-group-item-action" style={{ borderStyle: "none" }}>

        {/* <div className="col-1 d-flex flex-wrap align-content-center btn-outline-info"> */}
        <div className="col-1 text-secondary pt-3 text-center">
          <i className="fa fa-eye"></i>
          <span><strong>{props.viewCount}</strong></span>
        </div>

        <div className="col-11">

          <div className="d-flex justify-content-between">
            <Link
              to={`/view-update/${props.id}`}
              className="btn text-dark btn-link m-1"
            >
              {props.question}
            </Link>
          </div>
          <small className="mb-1 ml-3 text-info">
            asked by <i>{props.nickName}</i> on <i>{props.dateAdded}</i>
          </small>


          <div className="float-right">
            {/* <Link
              to={`/update/${props.id}`}
              className="btn text-info btn-sm m-1"
            >
              <i className="fa fa-user-edit"></i>
            </Link> */}

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