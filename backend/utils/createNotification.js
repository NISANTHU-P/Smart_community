const Notification = require('../models/Notification');

// Helper function to create notification
const createNotification = async (userId, message) => {
  try {
    await Notification.create({
      userId,
      message
    });
  } catch (error) {
    console.error('Error creating notification:', error);
  }
};

module.exports = createNotification;
