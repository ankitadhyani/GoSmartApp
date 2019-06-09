/** *************************************************************************************
 * File name: question-controller.js
 * 
 ************************************************************************************** */


// import Questions model
const { Question } = require('../models');


// GET all questions
// /api/questions
function getAllQuestions(req, res) {

  console.log("Inside question controllers -> getAllQuestions()");

  Question.find({})
    .sort({viewCount: -1})
    .then(dbQuestionData => res.status(200).json(dbQuestionData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
}


// GET all questions that have a particular tag
// /api/questions/tag/:tag
function getQuestionsByTag(req, res) {

  console.log("Inside question controllers -> getQuestionsByTag()");
  // console.log("req.params.tag: " + req.params.tag);
  let tagName = req.params.tag;

  // db.getCollection('questions').find({'userTags':'REST'},{'_id':1})

  Question.find(
      { userTags: tagName },
      // { _id: 1 }
    )
    .then(dbQuestionData => {
      console.log(dbQuestionData);
      res.status(200).json(dbQuestionData)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });

}


// GET all questions created by a particular user (userId)
// /api/questions/user
function getQuestionsByUserId(req, res) {

  console.log("Inside question controllers -> getQuestionsByUserId()");
  console.log("user Id = " + req._id); 


  Question.find( 
      { userId: req._id } 
    )
    .then(dbQuestionData => {
      
      console.log(dbQuestionData);

      res.status(200).json(dbQuestionData)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });

}



// GET a single question by it's _id
// /api/questions/:id
function getQuestionById(req, res) {

  console.log("Inside question controllers -> getQuestionById()");

  Question.findById(req.params.id)
    .then(dbQuestionData => res.status(200).json(dbQuestionData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });

}



// POST/create a new Question
// /api/Questions with req.body 
function createQuestion(req, res) {

  console.log("Inside question controllers -> createQuestion()");
  // console.log(req.body);


  Question.create(req.body)
    .then(dbQuestionData => res.status(200).json(dbQuestionData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
}

// PUT/update a Question by its _id
// /api/Questions/:id with req.body
function updateQuestion(req, res) {

  console.log("Inside question controllers -> updateQuestion()");


  Question.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        question: req.body.question,
        quesDescription: req.body.quesDescription,
        userTags: req.body.userTags,
        repliesObject: req.body.repliesObject,
        viewCount: req.body.viewCount,
        // userId: req.body.userId,
        dateAdded: req.body.dateAdded
      }
    },
    {
      new: true
    }
  )
    .then(dbQuestionData => res.status(200).json(dbQuestionData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
}

// DELETE/remove a Question by its _id
// /api/Questions/:id
function removeQuestion(req, res) {

  console.log("Inside question controllers -> removeQuestion()");

  Question.remove({
    _id: req.params.id
  })
    .then(dbQuestionData => res.status(200).json(dbQuestionData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
}


// export all functions as methods we can import into our route definitions
module.exports = {
  getAllQuestions,
  getQuestionsByTag,
  getQuestionsByUserId,
  getQuestionById,
  createQuestion,
  updateQuestion,
  removeQuestion
}
