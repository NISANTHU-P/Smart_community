const express = require('express');
const router = express.Router();
const {
  createBill,
  getAllBills,
  getBillById
} = require('../controllers/billController');
const { protect, authorize } = require('../middleware/auth');

// All routes are protected
router.use(protect);

router.route('/')
  .get(getAllBills)
  .post(authorize('Admin'), createBill);

router.route('/:id')
  .get(getBillById);

module.exports = router;
