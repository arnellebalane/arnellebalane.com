import './index.css';

if (process.env.NODE_ENV === 'production') {
    require('./scripts/google-analytics').initialize();
}

if (navigator.serviceWorker) {
    navigator.serviceWorker.register('sw.js').then(registration => {
        console.log('Service worker registered successfully.');
    });
}
