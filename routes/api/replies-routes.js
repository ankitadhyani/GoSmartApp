/** *************************************************************************************
 * File name: replies-routes.js
 * This file collects all the replies routes and provides the endpoint names
 ************************************************************************************** */


// import express router and our controller
const router = require('express').Router();


const {
    getAllReplies,
    getReplyById,
    createReply,
    updateReply,
    removeReply
} = require("../../controllers/repliesController");


// define routes

// GET and POST routes for /api/replies
router
    .route('/')
    .get(getAllReplies)
    .post(createReply);


// GET/PUT/DELETE routes for /api/replies/:id
router
    .route('/:id')
    .get(getReplyById)
    .put(updateReply)
    .delete(removeReply);

    
// export routes
module.exports = router;
