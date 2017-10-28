const functions = require('firebase-functions');
const admin = require('firebase-admin');
const webpush = require('web-push');
const secrets = require('./secrets.json');

admin.initializeApp(functions.config().firebase);
const database = admin.database();

function getSubscriptions() {
    return new Promise((resolve, reject) => {
        database.ref('subscriptions').once('value', (snapshot) => {
            const subscriptions = [];
            snapshot.forEach((child) => subscriptions.push(child.val()));
            resolve(subscriptions);
        });
    });
}

function sendNotification(subscription, payload) {
    payload = JSON.stringify(payload);
    return webpush.sendNotification(subscription, payload, {
        vapidDetails: {
            subject: 'https://arnellebalane.com/',
            publicKey: secrets.VAPID_PUBLIC_KEY,
            privateKey: secrets.VAPID_PRIVATE_KEy
        }
    });
}

exports.getSubscriptions = getSubscriptions;
exports.sendNotification = sendNotification;
