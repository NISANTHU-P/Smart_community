const MaintenanceBill = require('../models/MaintenanceBill');
const AuditLog = require('../models/AuditLog');
const createNotification = require('../utils/createNotification');

// @desc    Create maintenance bill (Admin only)
// @route   POST /api/bills
// @access  Private/Admin
exports.createBill = async (req, res) => {
  try {
    const { residentId, amount, dueDate } = req.body;

    const bill = await MaintenanceBill.create({
      residentId,
      amount,
      dueDate
    });

    // Create notification for resident
    await createNotification(residentId, `New maintenance bill generated: ₹${amount}`);

    // Create audit log
    await AuditLog.create({
      adminId: req.user._id,
      action: `Generated maintenance bill of ₹${amount}`
    });

    res.status(201).json(bill);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all bills (Admin sees all, Resident sees own)
// @route   GET /api/bills
// @access  Private
exports.getAllBills = async (req, res) => {
  try {
    let bills;

    if (req.user.role === 'Resident') {
      bills = await MaintenanceBill.find({ residentId: req.user._id })
        .populate('residentId', 'name email')
        .sort('-createdAt');
    } else {
      bills = await MaintenanceBill.find()
        .populate('residentId', 'name email')
        .sort('-createdAt');
    }

    res.json(bills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single bill
// @route   GET /api/bills/:id
// @access  Private
exports.getBillById = async (req, res) => {
  try {
    const bill = await MaintenanceBill.findById(req.params.id)
      .populate('residentId', 'name email');

    if (!bill) {
      return res.status(404).json({ message: 'Bill not found' });
    }

    res.json(bill);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
