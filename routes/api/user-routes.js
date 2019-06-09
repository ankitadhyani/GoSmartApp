
/** *************************************************************************************
 * File name: user-routes.js
 * This file collects the user routes and provides the endpoint names
 ************************************************************************************** */

// Import express.router() functionality
const router = require('express').Router();

// Import methods we exported from user-controller
const {
    register, 
    login, 
    getUserProfile, 
    updateUserProfile, 
    logOutUser, 
    getAllUsers 
  } = require('../../controllers/user-controller');



// Import authentication method 
const withAuth = require('../../middleware/authentication');


// GET user profile '/api/users'
router
  .route('/')
  .get(withAuth, getUserProfile)
  .delete(withAuth, logOutUser);


// POST register user '/api/users/register'
router
  .route('/register')
  .post(register);


// POST login user '/api/users/login'
router
  .route('/login')
  .post(login);

  
// PUT update user '/api/users/update'
router
  .route('/update')
  .put(withAuth,updateUserProfile);


router
  .route('/allusers')
  .get(getAllUsers);


module.exports = router;