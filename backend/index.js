const express=require("express");
const { connect } = require("mongoose");
const connectDB=require("./database/db")
const app=express()
const dotenv=require("dotenv")
const authRoute=require("./routes/auth")
const cookieParser=require("cookie-parser")
const userRoute=require("./routes/user")
const postRoute=require("./routes/posts")
const storyRoute=require("./routes/story")
const commentRoute=require("./routes/comment")
const path=require("path")
const {errorHandler}=require("./middleware/error")
const verifyToken = require("./middleware/verifyToken")


dotenv.config()
app.use(express.json())
app.use(cookieParser())

app.use("/api/auth",authRoute)
app.use("/api/user",verifyToken,userRoute)
app.use("/api/post",verifyToken,postRoute)
app.use("/api/comment",verifyToken,commentRoute)
app.use("/api/story",verifyToken,storyRoute)

app.use(express.static(path.join(__dirname, "../frontend/login")));
app.use(express.static(path.join(__dirname, 'frontend')));
// Handle client-side routing
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/login/index.html"));
});


app.use("/uploads",express.static(path.join(__dirname,"uploads")))
app.use(errorHandler)
app.listen(process.env.PORT,()=>{
    connectDB()
    console.log("running");
})