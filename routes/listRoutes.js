const router = require('express').Router();
const {
  createList,
  deleteList,
  getLists,
} = require('../controllers/listsController');
const verify = require('../utils/verifyToken');

router.route('/').post(verify, createList).get(verify, getLists);
router.route('/:id').delete(verify, deleteList);

module.exports = router;
