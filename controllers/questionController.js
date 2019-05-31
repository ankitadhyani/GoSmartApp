// import Questions model
const { Question } = require('../models');


// GET all questions
// /api/questions
function getAllQuestions(req, res) {

  console.log("Inside getAllQuestions()");

  Question.find({})
    .then(dbQuestionData => res.status(200).json(dbQuestionData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
}


// GET a single question by it's _id
// /api/questions/:id
function getQuestionById(req, res) {

  console.log("Inside getQuestionById()");

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

  console.log("Inside createQuestion()");
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

  console.log("Inside updateQuestion()");


  Question.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        question: req.body.question,
        quesDescription: req.body.quesDescription
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
  getQuestionById,
  createQuestion,
  updateQuestion,
  removeQuestion
}
