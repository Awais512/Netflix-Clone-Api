const User = require('../models/User');
const CryptoJS = require('crypto-js');
const asyncHandler = require('express-async-handler');
const ErrorResponse = require('../utils/errorResponse');
const jwt = require('jsonwebtoken');

//@route    POST /api/v1/auth/register
//@desc     Register New User
//@access   Public
const register = asyncHandler(async (req, res, next) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASSWORD_SECRET
    ).toString(),
  });
  const user = await newUser.save();
  res.status(200).json(user);

  res.status(500).json({ err: error.message });
});

//@route    POST /api/v1/auth/login
//@desc     Login User
//@access   Public
const login = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }
  const bytes = CryptoJS.AES.decrypt(
    user.password,
    process.env.PASSWORD_SECRET
  );
  const originalPssword = bytes.toString(CryptoJS.enc.Utf8);

  if (originalPssword !== req.body.password) {
    return next(new ErrorResponse('Password did not match', 400));
  }

  const token = jwt.sign(
    { id: user._id, isAdmin: user.isAdmin },
    process.env.PASSWORD_SECRET,
    { expiresIn: '5d' }
  );

  const { password, ...info } = user._doc;

  res.status(200).json({ token, ...info });
});

module.exports = { register, login };
