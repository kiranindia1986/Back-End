const express = require('express');
const router = express.Router();
const { getUserData } = require('../controllers/userDataController');
const db = require('../db'); // Ensure this imports your Firestore instance

// Route to get user data by UID
router.get('/:uid', (req, res) => getUserData(req, res, db));

module.exports = router;
