importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

workbox.core.skipWaiting();
workbox.precaching.precacheAndRoute([]);

// NOTE: All HTML pages should be dynamically cached, and also constantly
// revalidated to make sure that the cache is always up-to-date.

const staticUrlRegex = /\/static\//;
const notStaticUrl = ({url}) => !staticUrlRegex.test(url);

workbox.routing.registerRoute(
    notStaticUrl,
    new workbox.strategies.StaleWhileRevalidate()
);
