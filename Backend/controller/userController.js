const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const generateToken = require("../utilities/generateToken.js");

const registerUser = asyncHandler (async (req, res) => {
    const { name, email, password, mobile } = req.body;

    const userExists = await User.findOne({email});

    if(userExists){
        res.status(400)
        throw new Error("User already exists!!")
    }

    const user = await User.create({
        name,
        email,
        password,
        mobile
    })

    if (user) {
        res.status(201).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          mobile: user.mobile,
          token: generateToken(user._id, user.name, user.email),
        });
      } else {
        res.status(400);
        throw new Error("User not found");
      }
})

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
  
    const user = await User.findOne({ email });
  
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id, user.name, user.email)
      });
    } else {
      res.status(401);
      throw new Error("Invalid Email or Password");
    }
  });

  module.exports = {registerUser, authUser}