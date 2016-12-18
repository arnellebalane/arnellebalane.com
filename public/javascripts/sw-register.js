if ('serviceWorker' in navigator) {

    navigator.serviceWorker.register('/sw.js')
        .then(registration => console.log('Service worker successfully registered!'))
        .catch(error => console.error('Service worker registration failed!'));

}
