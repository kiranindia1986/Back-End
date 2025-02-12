const express = require('express');
const { getUnreadCounts } = require('../controllers/unreadCountsController');
const router = express.Router();

router.get('/:userId', getUnreadCounts);

module.exports = router;
