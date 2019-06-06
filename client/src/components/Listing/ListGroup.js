import React from 'react';
import ListGroupItem from './ListGroupItem';


// create a listgroup component that receives props for it's styling (flush) and receives props for the array of questions
function ListGroup(props) {
  return (
    <div className={`list-group ${props.flush ? "list-group-flush" : ""} `}>
      {
        (props.questionlist.length > 0) ? (
          props.questionlist.map(ques => {
            return (
              <ListGroupItem 
                key={ques._id}
                id={ques._id}
                questionObject={ques}
                
                handleDeleteQuestion={props.handleDeleteQuestion}
                handleUpdateViewCount={props.handleUpdateViewCount}
              />
            )
          })
        ) : (
            <h2>No questions to display 😒</h2>
        )
      }

    </div>
    
  )
}

export default ListGroup;