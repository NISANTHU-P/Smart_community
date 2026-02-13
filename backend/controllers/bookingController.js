const FacilityBooking = require('../models/FacilityBooking');
const AuditLog = require('../models/AuditLog');
const createNotification = require('../utils/createNotification');

// @desc    Create facility booking (Resident)
// @route   POST /api/bookings
// @access  Private/Resident
exports.createBooking = async (req, res) => {
  try {
    const { facilityName, bookingDate } = req.body;

    const booking = await FacilityBooking.create({
      facilityName,
      bookingDate,
      residentId: req.user._id
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all bookings (Admin sees all, Resident sees own)
// @route   GET /api/bookings
// @access  Private
exports.getAllBookings = async (req, res) => {
  try {
    let bookings;

    if (req.user.role === 'Resident') {
      bookings = await FacilityBooking.find({ residentId: req.user._id })
        .populate('residentId', 'name email')
        .sort('-createdAt');
    } else {
      bookings = await FacilityBooking.find()
        .populate('residentId', 'name email')
        .sort('-createdAt');
    }

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update booking status (Admin only)
// @route   PUT /api/bookings/:id
// @access  Private/Admin
exports.updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const booking = await FacilityBooking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    booking.status = status;
    await booking.save();

    // Create notification for resident
    await createNotification(booking.residentId, `Your facility booking for ${booking.facilityName} has been ${status.toLowerCase()}`);

    // Create audit log
    await AuditLog.create({
      adminId: req.user._id,
      action: `${status} facility booking for ${booking.facilityName}`
    });

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
