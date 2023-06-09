//this route will get the uploadeded pdf regardless of it was uploaded by whom
const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.get('/', async (req, res) => {
    const users = await User.find();
    const uploads = users.flatMap(user => user.uploadedFiles);
    res.send(uploads);
});

module.exports = router;
