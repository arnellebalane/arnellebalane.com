importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

workbox.core.skipWaiting();
workbox.precaching.precacheAndRoute([]);

const persistentPages = ['/', '/blog/', '/events/', '/projects/'];
const persistentPagesStrategy = new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'persistent-pages',
    plugins: [
        new workbox.broadcastUpdate.Plugin({
            channelName: 'page-updated'
        })
    ]
});

persistentPages.forEach(path => {
    workbox.routing.registerRoute(path, persistentPagesStrategy);
});
