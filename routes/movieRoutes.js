const router = require('express').Router();
const {
  createMovie,
  updateMovie,
  deleteMovie,
  getMovie,
  getRandomMovie,
} = require('../controllers/moviesController');
const verify = require('../utils/verifyToken');

router.get('/random', verify, getRandomMovie);
router.route('/').post(verify, createMovie);
router
  .route('/:id')
  .put(verify, updateMovie)
  .delete(verify, deleteMovie)
  .get(verify, getMovie);

module.exports = router;
