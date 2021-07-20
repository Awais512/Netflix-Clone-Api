const router = require('express').Router();
const {
  getUsers,
  getUser,
  deleteUser,
} = require('../controllers/usersController');

router.route('/').get(getUsers);
router.route('/:id').get(getUser).delete(deleteUser);

module.exports = router;
