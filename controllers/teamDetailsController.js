const { getFirestore } = require('firebase-admin/firestore');

const db = getFirestore();

// Controller function to fetch team details for a user
const getTeamDetails = async (req, res) => {
    const { uid } = req.params;

    try {
        // Reference to the user document in Firestore
        const userDocRef = db.collection('users').doc(uid);
        const userSnapshot = await userDocRef.get(); // Use .get() for Admin SDK

        if (!userSnapshot.exists) {
            return res.status(404).json({ message: 'User not found' });
        }

        const userData = userSnapshot.data();

        // Check if "teams" field exists in the document
        if (!userData.teams || !Array.isArray(userData.teams)) {
            return res.status(200).json({
                message: 'No teams found for the user',
                teams: [],
            });
        }

        // Process teams and add placeholder image if TeamsURL is missing
        const teams = userData.teams.map((team) => ({
            teamName: team.teamName,
            teamUid: team.teamUid,
            TeamsURL: team.TeamsURL || 'https://via.placeholder.com/150', // Use placeholder image if TeamsURL is not provided
        }));

        res.status(200).json({
            message: 'Teams fetched successfully',
            teams,
        });
    } catch (error) {
        console.error('Error fetching team details:', error);
        res.status(500).json({ error: 'Failed to fetch team details' });
    }
};

module.exports = { getTeamDetails };
