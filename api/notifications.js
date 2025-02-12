const express = require('express');
const { getNotifications } = require('../controllers/notificationsController');
const router = express.Router();

// Define the route for fetching notifications
router.get('/:userId', getNotifications);

module.exports = router;
