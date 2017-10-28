const functions = require('firebase-functions');
const admin = require('./admin');
const {
    getSubscriptions,
    sendNotification
} = require('./notifications');

const database = admin.database();

exports.githubDataWebhook = functions.https.onRequest((req, res) => {
    if (req.method !== 'POST') {
        return res.sendStatus(405);
    }
    database.ref('data/github').once('value', (snapshot) => {
        const githubData = snapshot.val();
        const updatedData = [req.body, ...githubData.slice(0, 2)];
        snapshot.ref.set(updatedData)
            .then(() => res.sendStatus(200));
    });
});

exports.mediumDataWebhook = functions.https.onRequest((req, res) => {
    if (req.method !== 'POST') {
        return res.sendStatus(405);
    }
    const updatedData = [req.body];
    database.ref('data/medium').set(updatedData)
        .then(() => res.sendStatus(200));
});

exports.notifyOnBlogPostUpdate = functions.database.ref('data/medium').onUpdate((e) => {
    const data = e.data.val();
    const latestPost = data[0];
    return getSubscriptions().then((subscriptions) => (
        Promise.all(subscriptions.map((subscription) => (
            sendNotification(subscription, latestPost)
        )))
    ));
});
