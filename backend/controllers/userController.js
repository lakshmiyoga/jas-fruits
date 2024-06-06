
const bcrypt = require('bcrypt');
const { generateToken, sendToken } = require('../middleware/authmiddleware');
const User = require('../models/userModel');
const catchAsyncError = require('../middleware/catchAsyncError');
const ErrorHandler = require('../utils/errorHandler');
const sendEmail = require("../utils/email");
const crypto = require('crypto');



//register user

const userRegister = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;
    
  if (!name || !email || !password) {
      return next(new ErrorHandler('Please provide all required fields: name, email, and password' , 400));
  }

  let avatar;
  const BASE_URL = process.env.BACKEND_URL;

  if (req.file) {
    avatar = `${BASE_URL}/uploads/user/${req.file.originalname}`;
  }

  try {
    let user = await User.findOne({ email }).select('+password');
    if (user) {
      return next(new ErrorHandler('Email already exists' , 400));
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const regUser = new User({
      name,
      email,
      password: hashedPassword,
      avatar
    });

    await regUser.save();
    sendToken(regUser, 201, res);
  } catch (error) {
    return next(new ErrorHandler('Internal Server Error' , 500));
    
  }
});


//login user

const userLogin = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
// console.log(email, password )
  let user = await User.findOne({ email }).select('+password');
  // console.log(user)
  if (!user) {
    return next(new ErrorHandler('Invalid credentials', 401));
  }
  // console.log(password, user.password)

  const isMatch = await bcrypt.compare(password, user.password);
  
  if (!isMatch) {
    return next(new ErrorHandler('Invalid credentials', 401));
  }

  // const token = generateToken(user);

  // res.status(201).json({ success:true, user, token});

  sendToken(user, 201, res)

});

//logout user

const logoutUser = (req, res, next) => {
  res.cookie('token', null, {
    expires: new Date(Date.now()),
    httpOnly: true
  })
    .status(200)
    .json({
      success: true,
      message: "user LoggedOut"
    })
}

//Requesting Password Reset

const requestPasswordReset = async (req, res, next) => {
  try {
    const { email } = req.body;
    console.log(email)
    const user = await User.findOne({ email });
    console.log(user)
    if (!user) {
      return next(new ErrorHandler('user not found with is email'));
    }

    // Generate a reset token
    const token = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordTokenExpire = Date.now() + 3600000; // Token expires in 1 hour
    await user.save();

    // Send email with reset link including the token

    const resetUrl = `${process.env.FRONTEND_URL}/password/reset/${user.resetPasswordToken}`
    const message = `Your password reset url is as follows \n\n ${resetUrl} \n\n If you have not request this email, then ignore it.`

    // Code to send email goes here
    sendEmail({
      email: user.email,
      subject: "password Recovery",
      message

    })

    res.status(200).json({ success: true, message: `email send to ${user.email}` });
  } catch (error) {
    next(error);
  }
};

//Resetting Password

const resetPassword = catchAsyncError(async (req, res, next) => {

  const { password } = req.body;
  const { token } = req.params;

  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordTokenExpire: { $gt: Date.now() }
  });
  if (!user) {
    return next(new ErrorHandler('Password reset token is invalid or expired'))
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler('Password does not match'))
  }

  // Update user's password
  user.password = await bcrypt.hash(password, 10);
  user.resetPasswordToken = undefined;
  user.resetPasswordTokenExpire = undefined;
  await user.save();

  sendToken(user, 201, res)

})

//Change Password  - api/v1/password/change
const changePassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password');

  // Check old password
  const isMatch = await bcrypt.compare(req.body.oldPassword, user.password);
  if (!isMatch) {
    return next(new ErrorHandler('Old password is incorrect', 401));
  }

  // Hashing the new password before saving it
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(req.body.password, salt);
  await user.save();

  res.status(200).json({
    success: true,
  });
});

// get user profile

const getUserProfile = catchAsyncError(async (req, res, next) => {
  // console.log(req)
  const user = await User.findById(req.user._id)
  console.log(user)
  if (user) {
    res.status(200).json({
      success: true,
      user
    })
  }

})



//update user profile

const updateUserProfile = catchAsyncError(async (req, res, next) => {

  let newUserData = {
    name: req.body.name,
    email: req.body.email
  }

  let avatar;
  const BASE_URL = process.env.BACKEND_URL;

  if (req.file) {
    avatar = `${BASE_URL}/uploads/user/${req.file.originalname}`;
    newUserData = { ...newUserData, avatar }
  }

  const user = await User.findByIdAndUpdate(
    req.user._id,
    
    {$set:newUserData},
    { new: true }
  ).select
  ('-password');
  await user.save();
  console.log("user",user);
  // console.log("req",req)

  if (!user) {
    return next(new ErrorHandler('User not found'));
  }
  // console.log(user)
  res.status(200).json({
    success: true,
    user
  })
});

//Admin: Get All Users - /api/v1/admin/users
const getAllUsers = catchAsyncError(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
       success: true,
       users
  })
})

//Admin: Get Specific User - api/v1/admin/user/:id
const getUser = catchAsyncError(async (req, res, next) => {
   const user = await User.findById(req.params.id);
   if(!user) {
       return next(new ErrorHandler(`User not found with this id ${req.params.id}`))
   }
   res.status(200).json({
       success: true,
       user
  })
});

//Admin: Update User - api/v1/admin/user/:id
const updateUser = catchAsyncError(async (req, res, next) => {
  console.log(req.body)
   const newUserData = {
       name: req.body.name,
       email: req.body.email,
       role: req.body.role
   }

   const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
       new: true,
       runValidators: true,
   })

   res.status(200).json({
       success: true,
       user
   })
})

//Admin: Delete User - api/v1/admin/user/:id
const deleteUser = catchAsyncError(async (req, res, next) => {
   const user = await User.findById(req.params.id);
   if(!user) {
       return next(new ErrorHandler(`User not found with this id ${req.params.id}`))
   }
   await user.remove();
   res.status(200).json({
       success: true,
   })
})




module.exports = { userRegister, userLogin, logoutUser, requestPasswordReset, resetPassword, getUserProfile, updateUserProfile, changePassword,getAllUsers,getUser,updateUser,deleteUser };
