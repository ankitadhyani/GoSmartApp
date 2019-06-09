/** *************************************************************************************
 * File name: user-controller.js
 * 
 * This file imports jsonwebtoken for creating bearer token for authentication, 
 * import data from 'models' folder
 * import promise-handler from utils folder
 * and exposes 3 apis to getUserProfile, login and register the user into the app
 * Returns: all the data is returned in json format
 ************************************************************************************** */


// Import dependencies
const jwt = require('jsonwebtoken');
require('dotenv').config();


const { User } = require('../models');
const handle = require('../utils/promise-handler');


// set up secret for JWT (json web token)...typically you'd hide this in a .env
const secret = process.env.SECRET;
console.log("secret: " + secret);




/** ***************************************************************************************
 * Function: register()
 * This function is triggerend when new user tries to register him/herself to the app
 * It stores user info to the DB
 * It is used when the POST route '/api/user/register' is hit
 **************************************************************************************** */

const register = (req, res) => {

  console.log("Inside user-controller -> POST '/api/user/register' -> register");
  console.log(req.body);

  // User.save(req.body)
  User.create(req.body)
    .then(dbUserData => res.status(200).json(dbUserData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
}



/** ***************************************************************************************
 * Function: login()
 * This function is triggerend when already registered user tries to login to the app
 * It verifies user info from the DB and fetches user data
 * It will run when user POSTs to '/api/user/login'
 * If successful it returns bearer token
 **************************************************************************************** */

const login = async (req, res) => {

  console.log("Inside POST '/api/user/login' -> login");

  // get email and password out of req.body
  const { email, password } = req.body;

  // find user based on email
  const [findUserErr, userInfo] = await handle(User.findOne({ email }));

  if (findUserErr) {
    console.log(findUserErr);
    res.status(500).json({
      error: "Internal error, try again"
    });
  }
  else if (userInfo === null) {
    res.status(401).json({
      error: "Incorrect email!"
    })
  }
  else {
    // check to see if password matches user's password
    const [pwErr, same] = await handle(userInfo.isCorrectPassword(password));


    if (pwErr) {
      res.status(500).json({
        error: "Internal error please try again!"
      });
    } else if (same === false) {
      res.status(401).json({
        error: "Incorrect password!"
      });
    } else {
      // issue our JWT
      const payload = {
        _id: userInfo._id,
        email: userInfo.email
      }
      // sign jwt
      const token = jwt.sign(payload, secret, {
        expiresIn: '1h'
      });

      // respond with web token to the front end
      res.status(200).json(token);

      // res.cookie('token', token, { httpOnly: true }).status(200).json(token);
      // res.cookie('token', token, { httpOnly: true }).status(200).json({
      //   accessToken: token, 
      //   userData: userInfo
      // });

    }

  }

} // End of login()


/** ***************************************************************************************
 * Function: getUserProfile()
 * It will run GET '/api/user' (this will be run through auth middleware)
 **************************************************************************************** */

const getUserProfile = async (req, res) => {

  console.log("Inside GET '/api/user' -> getUserProfile");

  const [userErr, userProfile] = await handle(User.findById(req._id));

  if (userErr) {
    res.status(500).json(userErr);
  } else {
    res.status(200).json(userProfile);
  }

} // End of getUserProfile()


/** ***************************************************************************************
 * Function: logOutUser()
 * It will run DELETE '/api/user' (this will be run through auth middleware)
 **************************************************************************************** */

const logOutUser = async (req, res) => {

  console.log("Inside DELETE '/api/user' -> logOutUser");

  let token =
    req.body.token ||
    req.query.token ||
    req.headers['x-access-token'] ||
    req.headers.authorization ||
    req.cookies.token;

  // console.log("token = " + token);

  // Clear token value from 'Cookie' so that when the user logs in next there is no token value
  res.clearCookie('token');
  res.redirect('/');

} // End of logOutUser()



/** ***************************************************************************************
 * Function: updateUserProfile()
 * This function updates user data when user updates his/her profile page
 * It will run PUT update user '/api/user/update'
 **************************************************************************************** */

const updateUserProfile = async (req, res) => {

  console.log("Inside PUT '/api/user/update' -> updateUserProfile");

  console.log("-----req.body------");
  console.log(req.body);

  const [userErr, userProfile] = await handle(User.findById(req._id));

  if (userErr) {
    res.status(500).json(userErr);
  } else {


    const oldPassword = userProfile.password;
    // console.log("oldPassword: " + oldPassword + " :: " + req.body.password);

    if (oldPassword === req.body.password) {

      console.log("password NOT changed --------------------------");

      User.findByIdAndUpdate(req._id, req.body, (error, userData) => {

        if (error) {
          return res.status(500).json({
            success: false,
            message: "Error updating new data."
          });
        }
        console.log(userData);
        console.log("successfully updated data");
        res.status(200).json(userData);
      });


    } else {

      console.log("password to be changed --------------------------");

      // Update 'userProfile' object with new data from req.body
      for (const key in req.body) {
        userProfile[key] = req.body[key];
      }

      userProfile.save(err => {
        if (err) {
          console.log(err);
          res.status(500).json({
            success: false,
            message: "Error updating new data."
          });
        } else {
          console.log("User profile data successfully saved!");
          console.log(userProfile);

          res.status(200).json(userProfile);
        }
      });

    }
  }

} // End of updateUserProfile()


// GET all users
// /api/allusers
function getAllUsers(req, res) {

  console.log("Inside user controller -> GET '/api/allusers' -> getAllUsers");

  User.find({})
    .sort({ nickName: 1 })
    .then(dbUserData => {
      console.log("dbUserData --> ");
      console.log(dbUserData);
      res.status(200).json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
}


// export our methods
module.exports = {
  getUserProfile,
  login,
  register,
  updateUserProfile,
  logOutUser,
  getAllUsers
}