const getUnreadCounts = async (req, res, db) => {
    const userId = req.params.userId;
    console.log(`UserID received: ${userId}`);

    try {
        console.log('Fetching notifications...');
        const notificationSnapshot = await db.collection('notification').get();
        console.log('Fetched notifications successfully.');

        const unreadNotificationsCount = notificationSnapshot.docs.filter((doc) => {
            const users = doc.data().users || [];
            return users.some((user) => user.id === userId && user.read === false);
        }).length;

        console.log(`Unread notifications count: ${unreadNotificationsCount}`);

        console.log('Fetching user chats...');
        const userChatsSnapshot = await db.collection('userChats').get();
        console.log('Fetched user chats successfully.');

        let unreadMessagesCount = 0;

        userChatsSnapshot.forEach((doc) => {
            const data = doc.data();
            console.log(`Document ID: ${doc.id}, Data:`, data);

            for (const key in data) {
                const subDoc = data[key];

                if (
                    subDoc.uid === userId &&
                    subDoc.lastMessage &&
                    subDoc.lastMessage.isRead === false
                ) {
                    unreadMessagesCount++;
                }
            }
        });

        console.log(`Unread messages count: ${unreadMessagesCount}`);

        res.status(200).json({
            unreadNotifications: unreadNotificationsCount,
            unreadMessages: unreadMessagesCount,
        });
    } catch (error) {
        console.error('Error fetching unread counts:', error);
        res.status(500).json({ error: error.message });
    }
};


module.exports = { getUnreadCounts };
