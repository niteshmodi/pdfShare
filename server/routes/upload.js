// upload.js
const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path');
const auth = require('../middleware/auth');
const User = require("../models/user");

// Set up multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});

// Set up multer upload
const upload = multer({ 
    storage: storage,
    fileFilter: function (req, file, cb) {
        // Only allow PDF files
        if (path.extname(file.originalname) !== '.pdf') {
            return cb(new Error('Only PDF files are allowed'))
        }
        cb(null, true)
    }
});

// Add a new route for authenticated users to upload PDF files
router.post('/', auth, upload.single('pdf'), async (req, res) => {
    // Handle the uploaded file here
    // The uploaded file will be stored in the 'uploads' directory on your server

    // Update the user document in the database to include the new file name
    await User.findByIdAndUpdate(req.user._id, { $push: { uploadedFiles: req.file.filename } });

    res.send('File uploaded');
});

module.exports = router;
