const express = require('express');
const router = express.Router();
const {
  getDashboardStats,
  getAuditLogs,
  exportReports
} = require('../controllers/reportController');
const { protect, authorize } = require('../middleware/auth');

// All routes are protected and only accessible by Admin
router.use(protect);
router.use(authorize('Admin'));

router.get('/dashboard', getDashboardStats);
router.get('/audit-logs', getAuditLogs);
router.get('/export', exportReports);

module.exports = router;
