const router = require('express').Router();
const {
  getUsers,
  getUser,
  deleteUser,
  updateUser,
} = require('../controllers/usersController');
const verify = require('../utils/verifyToken');

router.route('/').get(getUsers);
router
  .route('/:id')
  .get(getUser)
  .put(verify, updateUser)
  .delete(verify, deleteUser);

module.exports = router;
