const db = require('../db'); // Import Firestore instance

// Fetch notifications for a user
const getNotifications = async (req, res) => {
    const { userId } = req.params;

    try {
        // Fetch notifications where the user is in the 'users' array
        const snapshot = await db.collection('notification').get();

        const notifications = [];
        let unreadCount = 0;

        snapshot.forEach((doc) => {
            const notificationData = doc.data();

            // Filter relevant user data from 'users' array
            const userEntry = notificationData.users.find(
                (user) => user.id === userId && !user.deleted
            );

            if (userEntry) {
                notifications.push({ id: doc.id, ...notificationData });
                if (!userEntry.read) unreadCount++;
            }
        });

       // console.log('Unread Count:', unreadCount);
        //console.log('Notifications:', notifications);

        res.status(200).json({ count: unreadCount, notifications });
    } catch (error) {
        console.error('Error fetching notifications:', error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getNotifications };
