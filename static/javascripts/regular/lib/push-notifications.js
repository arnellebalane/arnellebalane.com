const enablePushNotificationsSubscriptions = (() => {

    const subscribeElement = $('.unsubscribed a');
    const unsubscribeElement = $('.subscribed a');
    const subscribedStatus = $('.subscribed');
    const unsubscribedStatus = $('.unsubscribed');

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
                .then((subscription) => subscription.unsubscribe())
                .then(handleUnsubscribed);
        });
    }

    function handleSubscribed(subscription) {
        subscribedStatus.classList.remove('hidden');
        unsubscribedStatus.classList.add('hidden');
        if (subscription) {
            // TODO: Send subscription details to server
        }
    }

    function handleUnsubscribed() {
        unsubscribedStatus.classList.remove('hidden');
        subscribedStatus.classList.add('hidden');
    }

    function enablePushNotificationsSubscriptions() {
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

    return enablePushNotificationsSubscriptions;

})();
