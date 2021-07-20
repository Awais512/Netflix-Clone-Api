const jwt = require('jsonwebtoken');
const ErrorResponse = require('../utils/errorResponse');

function verify(req, res, next) {
  const header = req.headers.token;
  if (header) {
    const token = header.split(' ')[1];
    jwt.verify(token, process.env.PASSWORD_SECRET, (err, user) => {
      if (err) return next(new ErrorResponse('Token is not valid'), 403);
      req.user = user;
      next();
    });
  } else {
    return next(
      new ErrorResponse('You are not authorized to perform this action'),
      401
    );
  }
}

module.exports = verify;
