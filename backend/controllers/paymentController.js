const Payment = require('../models/Payment');
const MaintenanceBill = require('../models/MaintenanceBill');
const createNotification = require('../utils/createNotification');

// @desc    Process payment (Resident)
// @route   POST /api/payments
// @access  Private/Resident
exports.processPayment = async (req, res) => {
  try {
    const { billId } = req.body;

    // Find the bill
    const bill = await MaintenanceBill.findById(billId);

    if (!bill) {
      return res.status(404).json({ message: 'Bill not found' });
    }

    // Check if bill is already paid
    if (bill.status === 'Paid') {
      return res.status(400).json({ message: 'Bill is already paid' });
    }

    // Update bill status to Paid
    bill.status = 'Paid';
    bill.paymentDate = new Date();
    await bill.save();

    // Create payment record
    const payment = await Payment.create({
      userId: req.user._id,
      billId: bill._id,
      amount: bill.amount,
      paymentDate: new Date(),
      status: 'Success'
    });

    // Create notification
    await createNotification(req.user._id, `Payment of ₹${bill.amount} processed successfully`);

    res.json({
      message: 'Payment processed successfully',
      payment
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get payment history (Resident sees own, Admin sees all)
// @route   GET /api/payments
// @access  Private
exports.getPaymentHistory = async (req, res) => {
  try {
    let payments;

    if (req.user.role === 'Resident') {
      payments = await Payment.find({ userId: req.user._id })
        .populate('billId')
        .populate('userId', 'name email')
        .sort('-paymentDate');
    } else {
      payments = await Payment.find()
        .populate('billId')
        .populate('userId', 'name email')
        .sort('-paymentDate');
    }

    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
