const mongoose = require('mongoose');

// FacilityBooking Schema - stores facility booking requests
const facilityBookingSchema = new mongoose.Schema({
  facilityName: {
    type: String,
    required: [true, 'Please add a facility name'],
    trim: true
  },
  bookingDate: {
    type: Date,
    required: [true, 'Please add a booking date']
  },
  residentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('FacilityBooking', facilityBookingSchema);
