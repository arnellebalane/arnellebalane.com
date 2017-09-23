import { $, publicKeyToUint8Array } from './utils.js';

const subscribeElement = $('.unsubscribed a');
const unsubscribeElement = $('.subscribed a');
const subscribedStatus = $('.subscribed');
const unsubscribedStatus = $('.unsubscribed');
const subscribePath = '/subscriptions/add';
const unsubscribePath = '/subscriptions/remove';

let currentRegistration;

function enableSubcribe() {
    subscribeElement.addEventListener('click', (e) => {
        e.preventDefault();

        const applicationServerKey = 'BJeWDJWeRl6IcbvYP6Gq7W3Sur17XbZ__8j9EtBqR-pUHAZxAS5VeHfll-EWoGdl4db9pipN94Hr_OXhyJ5Fuyg';
        const options = {
            applicationServerKey: publicKeyToUint8Array(applicationServerKey),
            userVisibleOnly: true
        };
        currentRegistration.pushManager.subscribe(options).then(handleSubscribed);
    });
}

function enableUnsubscribe() {
    unsubscribeElement.addEventListener('click', (e) => {
        e.preventDefault();

        currentRegistration.pushManager.getSubscription()
            .then((subscription) =>
                subscription.unsubscribe().then(() => subscription))
            .then(handleUnsubscribed);
    });
}

function handleSubscribed(subscription) {
    subscribedStatus.classList.remove('hidden');
    unsubscribedStatus.classList.add('hidden');
    if (subscription) {
        fetch(subscribePath, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(subscription.toJSON())
        });
    }
}

function handleUnsubscribed(subscription) {
    unsubscribedStatus.classList.remove('hidden');
    subscribedStatus.classList.add('hidden');
    if (subscription) {
        fetch(unsubscribePath, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(subscription.toJSON())
        });
    }
}

export default function enablePushNotificationsSubscriptions() {
    if (navigator.serviceWorker) {
        navigator.serviceWorker.ready.then((registration) => {
            currentRegistration = registration;
            registration.pushManager.getSubscription().then((subscription) => {
                console.log(subscription);
                if (subscription) {
                    handleSubscribed();
                } else {
                    handleUnsubscribed();
                }
            });

            enableSubcribe();
            enableUnsubscribe();
        });
    }
}
