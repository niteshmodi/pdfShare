const express = require("express");
const cors = require("cors");
const multer = require('multer');
const path = require('path');


require("dotenv").config();
require("./db/connectDB");
const app = express();
const PORT = process.env.PORT || 5000;

// import routes
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const uploadRoutes = require("./routes/upload");
const commentRoutes = require("./routes/servecomments");
const fileRoutes = require("./routes/file"); 
app.use(express.json());
app.use(cors());


// defining routes
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/file", fileRoutes);
app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});
