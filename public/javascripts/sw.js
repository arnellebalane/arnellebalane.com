const version = 1;
const cacheName = `cache-${version}`;
const paths = [
    '/',
    '/static/stylesheets/fonts.css',
    '/static/stylesheets/base.css',
    '/static/stylesheets/landing.css',
    '/static/javascripts/sw-register.js',
    '/static/images/avatar.jpg',
    '/static/images/background.jpg',
    '/static/images/background@2x.jpg',
    '/static/images/background@3x.jpg',
    '/static/images/facebook.png',
    '/static/images/twitter.png',
    '/static/images/github.png',
    '/static/images/website.png',
    '/static/fonts/quicksand/bold.woff2',
    "/static/manifest.json"
];


self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(cacheName)
            .then(cache => cache.addAll(paths))
            .then(_ => self.skipWaiting())
    );
});


self.addEventListener('activate', e => {
    e.waitUntil(
        caches.keys().then(cacheKeys => {
            return Promise.all(cacheKeys.map(cacheKey => {
                if (cacheKey !== cacheName) {
                    return caches.delete(cacheKey);
                }
            }));
        }).then(_ => self.clients.claim())
    );
});


self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request).then(response => {
            return response || fetch(e.request);
        })
    );
});
