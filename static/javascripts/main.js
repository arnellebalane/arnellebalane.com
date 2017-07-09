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



// Dynamically load external stylesheets
const stylesheets = [
    'static/stylesheets/fonts.css',
    'static/stylesheets/main.css'
];
const head = document.querySelector('head');

stylesheets.forEach((stylesheet) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = stylesheet;
    head.appendChild(link);
});
