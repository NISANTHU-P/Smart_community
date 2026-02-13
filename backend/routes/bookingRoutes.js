const express = require('express');
const router = express.Router();
const {
  createBooking,
  getAllBookings,
  updateBookingStatus
} = require('../controllers/bookingController');
const { protect, authorize } = require('../middleware/auth');

// All routes are protected
router.use(protect);

router.route('/')
  .get(getAllBookings)
  .post(authorize('Resident'), createBooking);

router.route('/:id')
  .put(authorize('Admin'), updateBookingStatus);

module.exports = router;
