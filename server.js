const express = require('express');
const cors = require('cors');
const db = require('./db'); // Import Firestore instance from db.js

// Initialize Express app
const app = express();
app.use(cors());
app.use(express.json());

// Import and register routes
const setupUnreadCountsRoutes = require('./api/unreadCounts');
const teamDetailsRoutes = require('./api/teamDetails');
const latestPostsRoutes = require('./api/latestPosts');

// Ensure distinct base paths for each route
app.use('/api/unread-counts', setupUnreadCountsRoutes(db)); // Route for unread counts
app.use('/api/team-details', teamDetailsRoutes); // Route for team details
app.use('/api/latest-posts', latestPostsRoutes); // Route for latest posts

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
