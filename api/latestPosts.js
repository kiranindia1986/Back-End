// routes/latestPosts.js
const express = require('express');
const { getLatestPosts } = require('../controllers/latestPostsController');

const router = express.Router();

router.get('/', getLatestPosts);

module.exports = router;
