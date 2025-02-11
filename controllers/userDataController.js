const getUserData = async (req, res, db) => {
    const userId = req.params.uid;

    try {
        const userDoc = db.collection('users').doc(userId);
        const docSnapshot = await userDoc.get();

        if (docSnapshot.exists) {
            res.status(200).json({ success: true, data: docSnapshot.data() });
        } else {
            res.status(404).json({ success: false, message: 'User not found' });
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { getUserData };
