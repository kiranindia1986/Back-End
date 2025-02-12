const db = require("../db");

module.exports = async (req, res) => {
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    const userId = req.query.userId; // Use req.query instead of req.params
    if (!userId) {
        return res.status(400).json({ error: "Missing userId parameter" });
    }

    try {
        console.log(`Fetching unread counts for user: ${userId}`);
        const notificationSnapshot = await db.collection("notification").get();
        const unreadNotificationsCount = notificationSnapshot.docs.filter((doc) => {
            const users = doc.data().users || [];
            return users.some((user) => user.id === userId && user.read === false);
        }).length;

        console.log("Fetching user chats...");
        const userChatsSnapshot = await db.collection("userChats").get();
        let unreadMessagesCount = 0;

        userChatsSnapshot.forEach((doc) => {
            const data = doc.data();
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

        res.status(200).json({
            unreadNotifications: unreadNotificationsCount,
            unreadMessages: unreadMessagesCount,
        });
    } catch (error) {
        console.error("Error fetching unread counts:", error);
        res.status(500).json({ error: error.message });
    }
};
