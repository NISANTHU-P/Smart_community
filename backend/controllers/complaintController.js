const Complaint = require('../models/Complaint');
const AuditLog = require('../models/AuditLog');
const createNotification = require('../utils/createNotification');

// @desc    Create new complaint (Resident)
// @route   POST /api/complaints
// @access  Private/Resident
exports.createComplaint = async (req, res) => {
  try {
    const { title, description } = req.body;

    const complaint = await Complaint.create({
      title,
      description,
      residentId: req.user._id
    });

    res.status(201).json(complaint);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all complaints (Admin/Staff see all, Resident sees own)
// @route   GET /api/complaints
// @access  Private
exports.getAllComplaints = async (req, res) => {
  try {
    let complaints;

    if (req.user.role === 'Resident') {
      // Residents see only their complaints
      complaints = await Complaint.find({ residentId: req.user._id })
        .populate('residentId', 'name email')
        .populate('assignedStaffId', 'name email')
        .sort('-createdAt');
    } else if (req.user.role === 'Staff') {
      // Staff see only assigned complaints
      complaints = await Complaint.find({ assignedStaffId: req.user._id })
        .populate('residentId', 'name email')
        .populate('assignedStaffId', 'name email')
        .sort('-createdAt');
    } else {
      // Admin sees all complaints
      complaints = await Complaint.find()
        .populate('residentId', 'name email')
        .populate('assignedStaffId', 'name email')
        .sort('-createdAt');
    }

    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single complaint
// @route   GET /api/complaints/:id
// @access  Private
exports.getComplaintById = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id)
      .populate('residentId', 'name email')
      .populate('assignedStaffId', 'name email');

    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    res.json(complaint);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Assign complaint to staff (Admin only)
// @route   PUT /api/complaints/:id/assign
// @access  Private/Admin
exports.assignComplaint = async (req, res) => {
  try {
    const { staffId } = req.body;

    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    complaint.assignedStaffId = staffId;
    complaint.status = 'In Progress';

    await complaint.save();

    // Create notification for staff
    await createNotification(staffId, `New complaint assigned: ${complaint.title}`);

    // Create notification for resident
    await createNotification(complaint.residentId, `Your complaint "${complaint.title}" has been assigned to staff`);

    // Create audit log
    await AuditLog.create({
      adminId: req.user._id,
      action: `Assigned complaint "${complaint.title}" to staff`
    });

    res.json(complaint);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update complaint status (Admin/Staff)
// @route   PUT /api/complaints/:id/status
// @access  Private/Admin/Staff
exports.updateComplaintStatus = async (req, res) => {
  try {
    const { status, completionNotes } = req.body;

    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    complaint.status = status;
    if (completionNotes) {
      complaint.completionNotes = completionNotes;
    }

    await complaint.save();

    // Create notification for resident
    await createNotification(complaint.residentId, `Your complaint "${complaint.title}" status updated to: ${status}`);

    res.json(complaint);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
