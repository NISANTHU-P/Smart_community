const User = require('../models/User');
const Complaint = require('../models/Complaint');
const MaintenanceBill = require('../models/MaintenanceBill');
const Payment = require('../models/Payment');
const AuditLog = require('../models/AuditLog');

// @desc    Get dashboard statistics (Admin only)
// @route   GET /api/reports/dashboard
// @access  Private/Admin
exports.getDashboardStats = async (req, res) => {
  try {
    // Count total users by role
    const totalResidents = await User.countDocuments({ role: 'Resident' });
    const totalStaff = await User.countDocuments({ role: 'Staff' });
    const totalUsers = await User.countDocuments();

    // Count complaints by status
    const totalComplaints = await Complaint.countDocuments();
    const pendingComplaints = await Complaint.countDocuments({ status: 'Pending' });
    const inProgressComplaints = await Complaint.countDocuments({ status: 'In Progress' });
    const completedComplaints = await Complaint.countDocuments({ status: 'Completed' });

    // Count bills by status
    const totalBills = await MaintenanceBill.countDocuments();
    const paidBills = await MaintenanceBill.countDocuments({ status: 'Paid' });
    const unpaidBills = await MaintenanceBill.countDocuments({ status: 'Unpaid' });

    // Calculate total revenue
    const paidBillsData = await MaintenanceBill.find({ status: 'Paid' });
    const totalRevenue = paidBillsData.reduce((sum, bill) => sum + bill.amount, 0);

    // Recent payments
    const recentPayments = await Payment.find()
      .populate('userId', 'name')
      .sort('-paymentDate')
      .limit(5);

    res.json({
      users: {
        total: totalUsers,
        residents: totalResidents,
        staff: totalStaff
      },
      complaints: {
        total: totalComplaints,
        pending: pendingComplaints,
        inProgress: inProgressComplaints,
        completed: completedComplaints
      },
      bills: {
        total: totalBills,
        paid: paidBills,
        unpaid: unpaidBills
      },
      revenue: {
        total: totalRevenue
      },
      recentPayments
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get audit logs (Admin only)
// @route   GET /api/reports/audit-logs
// @access  Private/Admin
exports.getAuditLogs = async (req, res) => {
  try {
    const logs = await AuditLog.find()
      .populate('adminId', 'name email')
      .sort('-timestamp')
      .limit(100);

    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Export reports as JSON (Admin only)
// @route   GET /api/reports/export
// @access  Private/Admin
exports.exportReports = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    const complaints = await Complaint.find().populate('residentId assignedStaffId', 'name email');
    const bills = await MaintenanceBill.find().populate('residentId', 'name email');
    const payments = await Payment.find().populate('userId billId');

    const report = {
      generatedAt: new Date(),
      users,
      complaints,
      bills,
      payments
    };

    res.json(report);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
