const express = require('express');
const router = express.Router();
const {
  createNotice,
  getAllNotices,
  deleteNotice
} = require('../controllers/noticeController');
const { protect, authorize } = require('../middleware/auth');

// All routes are protected
router.use(protect);

router.route('/')
  .get(getAllNotices)
  .post(authorize('Admin'), createNotice);

router.route('/:id')
  .delete(authorize('Admin'), deleteNotice);

module.exports = router;
