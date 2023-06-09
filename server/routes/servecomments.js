const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth"); // Import the auth middleware
const Comment = require("../models/Comment");
//handling both post and get request here for getting and uplaoding the comments
// Add a new route to create a comment
router.post('/:fileName', auth, async (req, res) => { // Call the auth middleware here
    const fileName = req.params.fileName;
    const text = req.body.text;
    const user = req.user._id;
    const userName = req.user.name;
    const newComment = new Comment({ fileName, text, user });
    await newComment.save();
    await newComment.populate('user');
    res.send(newComment);
});

// Add a new route to get comments for a specific file
router.get('/:fileName', async (req, res) => { // Call the auth middleware here
    const fileName = req.params.fileName;
    const comments = await Comment.find({ fileName: fileName }).populate('user', 'name');
    console.log("get comments is called ",comments);
    res.send(comments);
});


module.exports = router;
