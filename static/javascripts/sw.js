importScripts('sw-offline-google-analytics.js');
goog.offlineGoogleAnalytics.initialize();

const CACHE_NAME = 'arnelle-v1.9';
const CACHE_PATHS = [
    '/',
    '/static/manifest.json',
    '/static/stylesheets/main.css',
    '/static/javascripts/regular/main.js',
    '/static/javascripts/regular/lib/idb-fetch-mirror.js',
    '/static/javascripts/regular/lib/utils.js',
    '/static/javascripts/modules/main.js',
    '/static/javascripts/modules/lib/idb-fetch-mirror.js',
    '/static/javascripts/modules/lib/utils.js',
    '/static/images/avatar.png',
    '/static/images/sprites.png',
    '/static/fonts/Luna.woff',
    '/static/fonts/OpenSansRegular.woff',
    '/static/fonts/OpenSansLight.woff',
    '/sw-offline-google-analytics.js'
];

self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(CACHE_PATHS))
            .then(() => console.log('Assets cached for offline use'))
            .then(() => self.skipWaiting())
            .catch(console.error)
    );
});

self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys()
            .then((keys) => Promise.all(keys.map((key) => (
                key === CACHE_NAME ? null : caches.delete(key)
            ))))
            .then(() => self.clients.claim())
            .catch(console.error)
    );
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.open(CACHE_NAME)
            .then((cache) => cache.match(e.request))
            .then((response) => response || fetch(e.request))
            .catch(console.error)
    );
});

self.addEventListener('push', (e) => {
    const notification = e.data ? e.data.json() : {
        title: 'Hello there!',
        body: 'It\'s me, Arnelle!',
        icon: 'static/images/icon-144.png'
    };
    e.waitUntil(
        self.registration.showNotification(notification.title, {
            body: notification.body,
            icon: notification.icon,
            tag: 'arnelle-balane'
        })
    );
});

self.addEventListener('notificationclick', (e) => {
    const options = { tag: 'arnelle-balane' };
    e.waitUntil(
        self.registration.getNotifications(options)
            .then((notifications) => notifications.forEach((notification) => (
                notification.close()
            )))
            .then(() => self.clients.matchAll({
                includeControlled: true,
                type: 'window'
            }))
            .then((clients) => {
                if (clients.length > 0) {
                    clients[0].navigate('/');
                    clients[0].focus()
                } else {
                    self.clients.openWindow('/');
                }
            })
            .catch(console.error)
    );
});
