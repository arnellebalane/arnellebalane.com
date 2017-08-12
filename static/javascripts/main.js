if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
        .then(handleRegisterSuccess)
        .catch(handleRegisterFailure);
}

function handleRegisterSuccess(registration) {
    console.log('Service Worker Registered');
}

function handleRegisterFailure(error) {
    console.error(error);
}
