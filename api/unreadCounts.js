const express = require('express');
const { getUnreadCounts } = require('../controllers/unreadCountsController');
const router = express.Router();

const setupUnreadCountsRoutes = (db) => {
    router.get('/:userId', (req, res) => getUnreadCounts(req, res, db));

    return router;
};

module.exports = setupUnreadCountsRoutes;
