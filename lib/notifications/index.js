const { database } = require('../firebase');
const subscriptionsRef = database.ref('subscriptions');

function addSubscription(subscription) {
    return subscriptionsRef.push(subscription);
}

function removeSubscription(subscription) {
    return new Promise((resolve, reject) => {
        subscriptionsRef.once('value', (snapshot) => {
            let subscriptionRef;
            snapshot.forEach((child) => {
                if (child.val().endpoint === subscription.endpoint) {
                    subscriptionRef = child.ref;
                }
            });
            if (subscriptionRef) {
                subscriptionRef.remove().then(resolve, reject);
            }
        });
    });
}

exports.addSubscription = addSubscription;
exports.removeSubscription = removeSubscription;
