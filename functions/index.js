const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);
const database = admin.database();

exports.githubDataWebhook = functions.https.onRequest((req, res) => {
    if (req.method !== 'POST') {
        return res.sendStatus(404);
    }
    database.ref('data/github').once('value', (snapshot) => {
        const githubData = snapshot.val();
        const updatedData = [req.body, ...githubData.slice(0, 2)];
        snapshot.ref.set(updatedData)
            .then(() => res.sendStatus(200));
    });
});
