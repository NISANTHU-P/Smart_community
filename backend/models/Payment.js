const mongoose = require('mongoose');

// Payment Schema - stores payment records
const paymentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  billId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MaintenanceBill',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  paymentDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['Success', 'Failed'],
    default: 'Success'
  }
});

module.exports = mongoose.model('Payment', paymentSchema);
