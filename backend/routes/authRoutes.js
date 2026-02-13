const express = require('express');
const router = express.Router();
const { login, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

// Login route
router.post('/login', login);

// Get current user (protected route)
router.get('/me', protect, getMe);

module.exports = router;
