const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const catchAsyncError = require('./catchAsyncError');
const ErrorHandler = require('../utils/errorHandler');
const User = require("../models/userModel");



dotenv.config({path:"config/config.env"});

// Middleware for generating JWT token
function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      role: user.role // Include user role in the token payload
    },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
}

// Middleware for verifying JWT token
const isAuthenticateUser = catchAsyncError(async (req, res, next)=> {
  const {token} = req.cookies;
// console.log(token)
  if (!token) {
    return next(new ErrorHandler('Login first to handle the resource', 401))
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET)
  req.user = await User.findById(decoded.id)
  // console.log(req.user);
  next();
})

// Middleware for authorization based on user role

const authorizeRoles = (...roles) =>{
  return (req, res, next) => {
          if ( !roles.includes(req.user.role)) { // Check if user is authenticated and has required role
            return next(new ErrorHandler(`Role ${req.user.role} is not allowed`,401))
          }
          next();
        };
}

  

  const sendToken = (user, statusCode, res) =>{

    //create jwt token
     const token = generateToken(user);

    //setting cookies
    const options = {
      expires: new Date(
        Date.now()+ process.env.COOKIE_EXPIRES_TIME *24 * 60 * 60 * 1000
      ), 
      httpOnly:true,
    }
  
    res.status(statusCode)
    .cookie('token',token,options)
    .json({
      success:true,
      token,
      user

    })
  }
  
  

  module.exports = { generateToken,isAuthenticateUser,authorizeRoles,sendToken };