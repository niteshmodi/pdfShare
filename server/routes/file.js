const express = require("express");
const router = express.Router();
const fs = require('fs');
const auth = require("../middleware/auth"); // Import the auth middleware
const Comment = require("../models/Comment");

//route to serve a PDF file and its comments
router.get('/:fileName', auth, async (req, res) => { // Call the auth middleware here
    const fileName = req.body.fileName;
    const fileData = fs.readFileSync(`uploads/${fileName}`);
    const comments = await Comment.find({ fileName: fileName }).populate('user', 'name');
    res.send({ fileData: fileData.toString('base64'), comments: comments });
});

module.exports = router;
