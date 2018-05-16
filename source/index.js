import('./index.css');

if (navigator.serviceWorker) {
    navigator.serviceWorker.register('sw.js').then(registration => {
        console.log('Service worker registered successfully.');
    });
}
