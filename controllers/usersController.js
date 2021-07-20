const User = require('../models/User');
const CryptoJS = require('crypto-js');
const asyncHandler = require('express-async-handler');
const ErrorResponse = require('../utils/errorResponse');
const jwt = require('jsonwebtoken');

//@route    GET /api/v1/users
//@desc     Register New User
//@access   Public
const getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json(users);
});

//@route    GET /api/v1/users/:id
//@desc     Get UserByID
//@access   Public
const getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  res.status(200).json(user);
});

//@route    DELETE /api/v1/users/:id
//@desc     Delete UserByID
//@access   Private
const deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndRemove(req.params.id);
  if (!user) {
    return next(new ErrorResponse('User not found'), 404);
  }

  res.status(200).json({ msg: 'User deleted Successfully' });
});

module.exports = { getUsers, getUser, deleteUser };
