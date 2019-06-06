
/**  *************************************************************************************
 * File name: replies.js
 * 
 * This file creates Replies schema that stores all the replies linked to question schema
 **************************************************************************************  */

// Import dependencies
const mongoose = require('mongoose');

const {
  Schema
} = mongoose;


// Create fields for the 'RepliesSchema' collection
const RepliesSchema = new Schema({

  reply: {
    type: String
  },
  replyThumbsUpCount: {
    type: Number,
    default: 0

  },
  replyThumbsDownCount: {
    type: Number,
    default: 0
  },
  replyUserId: {
    ref: "user",
    type: mongoose.Schema.Types.ObjectId
  },
  replyAddedOn: {
    type: String
  },
  replyUserNickName: {
    type: String
  }
  
});


// Export "replies" table
const Replies = mongoose.model("replies", RepliesSchema);

module.exports = Replies;
