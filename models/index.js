/** *************************************************************************************
 * File name: index.js
 * 
 * This file performs exports job and user model to the rest of the app
 ************************************************************************************** */


module.exports = {
  job: require("./job"),
  User: require("./user"),
  Question: require("./question"),
  Replies: require("./replies")
};