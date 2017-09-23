const webpush = require('web-push');
const { database } = require('../firebase');
const config = require('../../config');

const subscriptionsRef = database.ref('subscriptions');

function getSubscriptions() {
    return new Promise((resolve, reject) => {
        subscriptionsRef.once('value', (snapshot) => {
            const subscriptions = [];
            snapshot.forEach((child) => subscriptions.push(child.val()));
            resolve(subscriptions);
        });
    });
}

function addSubscription(subscription) {
    return subscriptionsRef.push(subscription);
}

function removeSubscription(subscription) {
    return new Promise((resolve, reject) => {
        subscriptionsRef.orderByChild('endpoint')
            .equalTo(subscription.endpoint)
            .once('value', (snapshot) => {
                snapshot.ref.remove().then(resolve, reject);
            });
    });
}

function sendNotification(subscription, payload) {
    return webpush.sendNotification(subscription, payload, {
        vapidDetails: {
            subject: 'https://arnellebalane.com/',
            publicKey: config.get('VAPID_PUBLIC_KEY'),
            privateKey: config.get('VAPID_PRIVATE_KEY')
        }
    });
}

exports.getSubscriptions = getSubscriptions;
exports.addSubscription = addSubscription;
exports.removeSubscription = removeSubscription;
exports.sendNotification = sendNotification;
