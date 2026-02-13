const Notice = require('../models/Notice');
const AuditLog = require('../models/AuditLog');

// @desc    Create notice (Admin only)
// @route   POST /api/notices
// @access  Private/Admin
exports.createNotice = async (req, res) => {
  try {
    const { title, message } = req.body;

    const notice = await Notice.create({
      title,
      message,
      createdBy: req.user._id
    });

    // Create audit log
    await AuditLog.create({
      adminId: req.user._id,
      action: `Created notice: ${title}`
    });

    res.status(201).json(notice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all notices
// @route   GET /api/notices
// @access  Private
exports.getAllNotices = async (req, res) => {
  try {
    const notices = await Notice.find()
      .populate('createdBy', 'name')
      .sort('-createdAt');

    res.json(notices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete notice (Admin only)
// @route   DELETE /api/notices/:id
// @access  Private/Admin
exports.deleteNotice = async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id);

    if (!notice) {
      return res.status(404).json({ message: 'Notice not found' });
    }

    await notice.deleteOne();

    // Create audit log
    await AuditLog.create({
      adminId: req.user._id,
      action: `Deleted notice: ${notice.title}`
    });

    res.json({ message: 'Notice removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
