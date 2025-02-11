// controllers/latestPostsController.js
const getLatestPosts = async (req, res) => {
    try {
        const db = require('../db'); // Ensure Firestore is imported
        const postsSnapshot = await db.collection('blogs')
            .orderBy('createdAt', 'desc')
            .limit(5)
            .get();

        const posts = postsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

        res.status(200).json({ posts });
    } catch (error) {
        console.error('Error fetching latest posts:', error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getLatestPosts };
