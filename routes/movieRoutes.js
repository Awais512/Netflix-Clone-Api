const router = require('express').Router();
const {
  createMovie,
  updateMovie,
  deleteMovie,
  getMovies,
  getMovie,
  getRandomMovie,
} = require('../controllers/moviesController');
const verify = require('../utils/verifyToken');

router.get('/random', verify, getRandomMovie);
router.route('/').post(verify, createMovie).get(verify, getMovies);
router
  .route('/:id')
  .put(verify, updateMovie)
  .delete(verify, deleteMovie)
  .get(verify, getMovie);

module.exports = router;
