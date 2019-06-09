/** *************************************************************************************
 * File name: jobs-controller.js
 * 
 * This file imports data from 'models' folder  and exposes 2 apis to 
 * see all jobs & create/post a new job in DB
 * Returns: all the data is returned in json format
 ************************************************************************************** */

/* eslint-disable no-underscore-dangle */

// Import dependencies

// const User = require('../models').user;
const { User } = require('../models');
const Jobs = require('../models').job;
const handle = require('../utils/promise-handler');


// This function handles the foreach async await problem
async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}



// GET savedjobs Ids '/api/jobs' for a user
const getSavedJobs = async (req, res) => {

  console.log("Inside GET '/api/jobs' -> getSavedJobs");
  // console.log("req._id = " + req._id);

  const [userErr, userData] = await handle(User.findById(req._id));

  if (userErr) {
    return res.json(500).json(userErr);
  }

  // Get all the job Ids from 'savedJobsArray[]' that are related to the particular user
  const jobsIds = userData.savedJobsArray;
  // console.log("jobsIds: " + jobsIds);

  const arrayOfJobsData = [];

  const start = async () => {

    await asyncForEach(jobsIds, async (jobId) => {

      const [jobErr, jobData] = await handle(Jobs.findById(jobId));

      if (jobErr) {
        return res.json(500).json(jobErr);
      }

      return arrayOfJobsData.push(jobData);

    })

    // console.log(arrayOfJobsData);
    return res.status(200).json(arrayOfJobsData);
  }

  start();

  return true;
};


// This function will save the job id in users table 
async function pushToSavedJobsArray(userId, newJobId) {

  console.log("Inside pushToSavedJobsArray()");

  // Update User table with job id of the current saved job
  const [userFindErr, userData] = await handle(User.findById(userId));

  // console.log("------------------------------");
  // console.log(userData);
  // console.log("------------------------------");

  if (userFindErr) {
    return (userFindErr);
  }

  return User.findOneAndUpdate({
      _id: userId
    }, {
      $push: {
        savedJobsArray: newJobId
      }
    }, {
      new: true
    }).then(userInfo => {
      if (userInfo !== null) {
        return userInfo;
      }

      return res.json({
        message: 'Job already saved!'
      });
    })
    .catch(err => {
      console.log(err);
      return (err);
    });

}


// CREATE/POST jobs for a user '/api/jobs'
const saveJobToDB = async (req, res) => {

  console.log("Inside POST '/api/jobs' -> saveJobToDB");
  console.log(req.body);
  console.log("req._id = " + req._id);

  // Fields required (which ever is available):
  // jobTitle, jobtype, position, salary, location, company, link, description, posted

  // Create a new job using req.body
  Jobs.create(req.body)
    .then(function createNewUser(dbNewJobData) {
      console.log("----------");
      console.log(dbNewJobData);
      // If saved successfully, send the the new job document to the client
      pushToSavedJobsArray(req._id, dbNewJobData._id);
      res.status(200).json(dbNewJobData);
    
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });

};




// DELETE jobs for a user 
// /api/jobs/:id
const deleteSavedJob = async (req, res) => {

  console.log("Inside DELETE '/api/jobs/:id' -> deleteSavedJob");

  const userID = req._id;
  const jobIdToBeDeleted = req.params.id;
  // console.log("user id -> req.id: " + userID);
  // console.log("job id -> req.body.jobId: " + jobIdToBeDeleted);


  // Delete the jobId from 'savedJobsArray' in User collection
  const [userErr, userData] = await handle(User.findById(userID));

  if (userErr) {
    return res.json(500).json(userErr);
  }

  const newSavedJobsArray = userData.savedJobsArray;
  newSavedJobsArray.splice(newSavedJobsArray.indexOf(jobIdToBeDeleted), 1);



  User.findByIdAndUpdate(userID, {
    savedJobsArray: newSavedJobsArray
  }, (error, user) => {

    if (error) {
      return res.status(500).json({
        success: false,
        message: "Error updating new data."
      });
    }


    // Delete document from Jobs collection -------------------
    Jobs.findByIdAndRemove(jobIdToBeDeleted, (err, jobData) => {

      if (err) {
        return res.status(500).json({
          success: false,
          message: "Error deleting job."
        });
      }

      console.log("jobData after deletion: ");
      console.log(jobData);

      return res.status(200).json({
        success: true,
        message: "Job successfully deleted!"
      });

    });

    return true;
  });

  return true; 
} // End of deleteSavedJob()





module.exports = {
  saveJobToDB,
  getSavedJobs,
  deleteSavedJob
};