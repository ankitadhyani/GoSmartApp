
/**  *************************************************************************************
 * File name: question.js
 * 
 * This file creates Question schema
 **************************************************************************************  */

// Import dependencies
const mongoose = require('mongoose');

// Get Schema constructor out of mongoose
const { Schema } = mongoose;


// Create fields for the 'QuestionSchema' collection
const QuestionSchema = new Schema({

   question: {
      type: String,
      required: true
   },
   quesDescription: {
      type: String
   },
   userTags: [],
   repliesObject: [{
      ref: "replies",
      type: mongoose.Schema.Types.ObjectId
   }],
   viewCount: {
      type: Number,
      default: 0
   },
   userId: {
      ref: "user",
      type: mongoose.Schema.Types.ObjectId
   },
   dateAdded: {
      type: String
   },
   quesNickName: {
      type: String
   }
});


// Export "questions" table
const Question = mongoose.model("questions", QuestionSchema);

module.exports = Question;