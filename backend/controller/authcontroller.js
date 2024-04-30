const User = require("../models/user");
const bcrypt = require("bcrypt");
const { JsonWebTokenError } = require("jsonwebtoken");
const jwt = require("jsonwebtoken");
const express=require("express");
const bodyParser = require('body-parser');

const app=express()
const path=require("path")
const { CustomError } = require("../middleware/error");
const registerController = async (req, res, next) => {
    try {
        
        const { password, username, email, fullName } = req.body;

        // Check if username or email already exists
        const existUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existUser) {
            return res.status(400).json({ error: "Username or email already exists!" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user with hashed password
        const newUser = new User({ username, email, password: hashedPassword, fullName });

        // Save the user to the database
        const savedUser = await newUser.save();

  

    } catch (error) {
        next(error);
    }
};

const loginController = async (req, res, next) => {
    try {
      let user;
      if (req.body.email) {
        user = await User.findOne({ email: req.body.email });
      } else {
        user = await User.findOne({ username: req.body.username });
      }
      if (!user) {
        throw new Error("User not found");
      }
      const match = await bcrypt.compare(req.body.password, user.password);
      if (!match) {
        throw new Error("Wrong credentials");
      }
      const { password, ...data } = user._doc;
      const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY, {
        expiresIn: process.env.JWT_EXPIRE,
      });
      res.cookie("token", token).status(200).json({ data, token, redirectUrl: "/index.html" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
const logoutController=async(req,res,next)=>{
    try{
        res.clearCookie("token",{sameSite:"none",secure:true}).status(200).json("user logout")
       } 
       catch(error){
       next(error)
    }
}

const refetchController=async(req,res,next)=>{
    const token = req.cookies.token;

    // Check if token is present
    if (!token) {
        return res.status(400).json("Token is missing");
    }

    // Verify token
    jwt.verify(token, process.env.JWT_KEY, {}, async (err, data) => {
        if (err) {
            throw new CustomError (err,404);
        }
        try {
            const id = data._id;
            const user = await User.findOne({ _id: id });
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    });
}
module.exports={registerController,loginController,logoutController,refetchController}