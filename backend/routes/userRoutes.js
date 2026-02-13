const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getUsersByRole,
  createUser,
  updateUser,
  deleteUser
} = require('../controllers/userController');
const { protect, authorize } = require('../middleware/auth');

// All routes are protected and only accessible by Admin
router.use(protect);
router.use(authorize('Admin'));

router.route('/')
  .get(getAllUsers)
  .post(createUser);

router.route('/role/:role')
  .get(getUsersByRole);

router.route('/:id')
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;
