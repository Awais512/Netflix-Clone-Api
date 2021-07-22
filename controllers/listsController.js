const List = require('../models/List');
const asyncHandler = require('express-async-handler');
const ErrorResponse = require('../utils/errorResponse');

//@route    POST /api/v1/lists
//@desc     Create New List
//@access   Authenticated/Admin
const createList = asyncHandler(async (req, res, next) => {
  if (req.user.isAdmin) {
    const newList = new List(req.body);
    const list = await newList.save();
    res.status(201).json(list);
  } else {
    return next(
      new ErrorResponse(
        'You do not have permission to access this feature',
        403
      )
    );
  }
});

//@route    POST /api/v1/lists
//@desc     Create New List
//@access   Authenticated/Admin
const getLists = asyncHandler(async (req, res, next) => {
  const typeQuery = req.query.type;
  const genreQuery = req.query.genre;
  let list = [];
  if (typeQuery) {
    if (genreQuery) {
      list = await List.aggregate([
        { $sample: { size: 10 } },
        { $match: { type: typeQuery, genre: genreQuery } },
      ]);
    } else {
      list = await List.aggregate([
        { $sample: { size: 10 } },
        { $match: { type: typeQuery } },
      ]);
    }
  } else {
    list = await List.aggregate([{ $sample: { size: 10 } }]);
  }
  res.status(200).json(list);
});

//@route    DELETE /api/v1/lists/:id
//@desc     Delete List
//@access   Authenticated/Admin
const deleteList = asyncHandler(async (req, res, next) => {
  if (req.user.isAdmin) {
    const list = await List.findByIdAndRemove(req.params.id);
    if (!list) {
      return next(new ErrorResponse('List not found', 404));
    }
    res.status(200).json({ msg: 'List has been removed' });
  } else {
    return next(
      new ErrorResponse(
        'You do not have permission to access this feature',
        403
      )
    );
  }
});

module.exports = { createList, deleteList, getLists };
