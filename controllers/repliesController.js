// import Replies model
const { Replies } = require('../models');


// GET all replies
// /api/replies
function getAllReplies(req, res) {

  console.log("Inside controllers -> getAllReplies()");

  Replies.find({})
    .then(dbRepliesData => res.status(200).json(dbRepliesData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
}


// GET a single reply by it's _id
// /api/replies/:id
function getReplyById(req, res) {

  console.log("Inside controllers -> getReplyById()");

  Replies.findById(req.params.id)
    .then(dbReplyData => res.status(200).json(dbReplyData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });

}



// POST/create a new Reply
// /api/replies with req.body 
function createReply(req, res) {

  console.log("Inside controllers -> createReply()");
  // console.log(req.body);


  Replies.create(req.body)
    .then(dbReplyData => res.status(200).json(dbReplyData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
}

// PUT/update a Reply by its _id
// /api/replies/:id with req.body
function updateReply(req, res) {

  console.log("Inside controllers -> updateReply()");
  console.log(req.body);


  Replies.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        reply: req.body.reply,
        replyThumbsUpCount: req.body.thumbsUpCount,
        replyThumbsDownCount: req.body.thumbsDownCount,
        // replyUserId: req.body.replyUserId,
        // replyAddedOn: req.body.replyAddedOn
      }
    },
    {
      new: true
    }
  )
    .then(dbReplyData => res.status(200).json(dbReplyData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
}

// DELETE/remove a Reply by its _id
// /api/replies/:id
function removeReply(req, res) {

  console.log("Inside controllers -> removeReply()");

  Replies.remove({
    _id: req.params.id
  })
    .then(dbReplyData => res.status(200).json(dbReplyData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
}


// export all functions as methods we can import into our route definitions
module.exports = {
  getAllReplies,
  getReplyById,
  createReply,
  updateReply,
  removeReply
}
