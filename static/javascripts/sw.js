const CACHE_NAME = 'arnelle-v1';
const CACHE_PATHS = [
    '/',
    '/static/manifest.json',
    '/static/stylesheets/fonts.css',
    '/static/stylesheets/main.css',
    '/static/javascripts/main.js',
    '/static/images/avatar.png',
    '/static/images/github.png',
    '/static/images/codepen.png',
    '/static/fonts/Luna.ttf',
    '/static/fonts/OpenSansRegular.ttf',
    '/static/fonts/OpenSansLight.ttf',
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
