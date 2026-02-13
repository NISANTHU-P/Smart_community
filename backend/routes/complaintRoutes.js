const express = require('express');
const router = express.Router();
const {
  createComplaint,
  getAllComplaints,
  getComplaintById,
  assignComplaint,
  updateComplaintStatus
} = require('../controllers/complaintController');
const { protect, authorize } = require('../middleware/auth');

// All routes are protected
router.use(protect);

router.route('/')
  .get(getAllComplaints)
  .post(authorize('Resident'), createComplaint);

router.route('/:id')
  .get(getComplaintById);

router.route('/:id/assign')
  .put(authorize('Admin'), assignComplaint);

router.route('/:id/status')
  .put(authorize('Admin', 'Staff'), updateComplaintStatus);

module.exports = router;
