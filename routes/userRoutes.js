const router = require('express').Router();
const {
  getUsers,
  getUser,
  deleteUser,
  updateUser,
  getUsersStats,
} = require('../controllers/usersController');
const verify = require('../utils/verifyToken');

router.get('/stats', getUsersStats);

router.route('/').get(verify, getUsers);
router
  .route('/:id')
  .get(getUser)
  .put(verify, updateUser)
  .delete(verify, deleteUser);

module.exports = router;
