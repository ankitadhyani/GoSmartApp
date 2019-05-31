/** *************************************************************************************
 * File name: question-routes.js
 * This file collects all the question routes and provides the endpoint names
 ************************************************************************************** */


// import express router and our controller
const router = require('express').Router();


const { 
    getAllQuestions, 
    getQuestionById, 
    createQuestion, 
    updateQuestion, 
    removeQuestion 
} = require("../../controllers/questionController");


// define routes

// GET and POST routes for /api/questions
router
  .route('/')
  .get(getAllQuestions)
  .post(createQuestion);


// GET/PUT/DELETE routes for /api/questions/:id
router
  .route('/:id')
  .get(getQuestionById)
  .put(updateQuestion)
  .delete(removeQuestion);

// export routes
module.exports = router;
