const Movie = require('../models/Movie');
const asyncHandler = require('express-async-handler');
const ErrorResponse = require('../utils/errorResponse');

//@route    POST /api/v1/auth/movies
//@desc     Create New Movie
//@access   Private
const createMovie = asyncHandler(async (req, res, next) => {
  const movie = new Movie(req.body);
  const savedMovie = await movie.save();
  res.status(201).json(savedMovie);
});

//@route    PUT /api/v1/auth/movies/:id
//@desc     Update  Movie
//@access   Private
const updateMovie = asyncHandler(async (req, res, next) => {
  if (req.user.isAdmin) {
    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedMovie);
  } else {
    return next(
      new ErrorResponse(
        'You do not have permission to access this feature',
        403
      )
    );
  }
});

//@route    PUT /api/v1/auth/movies/:id
//@desc     Update  Movie
//@access   Private
const deleteMovie = asyncHandler(async (req, res, next) => {
  if (req.user.isAdmin) {
    const movie = await Movie.findByIdAndRemove(req.params.id);
    if (!movie) {
      return next(new ErrorResponse('Movie not found', 403));
    }

    res.status(200).json({ msg: 'Movie has been removed' });
  } else {
    return next(
      new ErrorResponse(
        'You do not have permission to access this feature',
        403
      )
    );
  }
});

//@route    GET /api/v1/auth/movies/:id
//@desc     Get  Movie
//@access   Authenticated
const getMovie = asyncHandler(async (req, res, next) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie) {
    return next(new ErrorResponse('Movie not found', 404));
  }
  res.status(200).json(movie);
});

module.exports = { createMovie, updateMovie, deleteMovie, getMovie };
