const User = require('../models/User');
const CryptoJS = require('crypto-js');
const asyncHandler = require('express-async-handler');
const ErrorResponse = require('../utils/errorResponse');

//@route    GET /api/v1/users
//@desc     Register New User
//@access   Public
const getUsers = asyncHandler(async (req, res, next) => {
  const query = req.query.new;
  if (req.user.isAdmin) {
    const users = query
      ? await User.find().sort({ _id: -1 }).select('-password').limit(10)
      : await User.find().select('-password');
    res.status(200).json(users);
  } else {
    return next(new ErrorResponse('Only admin can see all users', 403));
  }
});

//@route    GET /api/v1/users/:id
//@desc     Get UserByID
//@access   Public
const getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id).select('-password');
  res.status(200).json(user);
});

//@route    PUT /api/v1/users/:id
//@desc     Update User
//@access   Private
const updateUser = asyncHandler(async (req, res, next) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    if (req.body.password) {
      req.body.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.PASSWORD_SECRET
      ).toString();
    }
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    if (!user) {
      return next(new ErrorResponse('User not found', 404));
    }
    res.status(200).json(user);
  } else {
    return next(new ErrorResponse('You can only update your account', 403));
  }
});

//@route    DELETE /api/v1/users/:id
//@desc     Delete User
//@access   Private
const deleteUser = asyncHandler(async (req, res, next) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return next(new ErrorResponse('User not found'), 404);
    }

    res.status(200).json({ msg: 'User deleted Successfully' });
  } else {
    return next(new ErrorResponse('You can only delete your account', 403));
  }
});

//@route    GET /api/v1/users/stats
//@desc     Get Users Stats
//@access   Private

const getUsersStats = asyncHandler(async (req, res, next) => {
  const today = new Date();
  const latYear = today.setFullYear(today.setFullYear() - 1);

  const monthArrays = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const data = await User.aggregate([
    {
      $project: {
        month: { $month: '$createdAt' },
      },
    },
    {
      $group: {
        _id: '$month',
        total: { $sum: 1 },
      },
    },
  ]);
  res.status(200).json(data);
});

module.exports = { getUsers, getUser, deleteUser, updateUser, getUsersStats };
