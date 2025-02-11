const express = require('express');
const { getTeamDetails } = require('../controllers/teamDetailsController');
const router = express.Router();

// Route to fetch team details for a user
router.get('/:uid', getTeamDetails);

module.exports = router;
