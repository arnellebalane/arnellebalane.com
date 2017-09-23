importScripts('sw-offline-google-analytics.js');
goog.offlineGoogleAnalytics.initialize();

const CACHE_NAME = 'arnelle-v1.11';
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
    '/static/images/avatar.webp',
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
        title: 'Arnelle posted a new article',
        body: 'Tap to check it out',
        icon: 'static/images/icon-144.png',
        data: 'https://arnellebalane.com/'
    };
    e.waitUntil(
        self.registration.showNotification(notification.title, {
            body: notification.body,
            icon: notification.icon,
            tag: 'blog-post'
        })
    );
});

self.addEventListener('notificationclick', (e) => {
    e.notification.close();
    e.waitUntil(
        self.clients.matchAll({
            includeControlled: true,
            type: 'window'
        })
        .then((clients) => {
            if (clients.length > 0) {
                clients[0].navigate(e.notification.data);
                clients[0].focus()
            } else {
                self.clients.openWindow(e.notification.data);
            }
        })
        .catch(console.error)
    );
});
