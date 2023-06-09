const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    fileName: { type: String, required: true },
    text: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Comment", commentSchema);
