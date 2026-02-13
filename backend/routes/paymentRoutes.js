const express = require('express');
const router = express.Router();
const {
  processPayment,
  getPaymentHistory
} = require('../controllers/paymentController');
const { protect } = require('../middleware/auth');

// All routes are protected
router.use(protect);

router.route('/')
  .get(getPaymentHistory)
  .post(processPayment);

module.exports = router;
