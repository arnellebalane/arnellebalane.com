document.addEventListener('DOMContentLoaded', () => {
    fetchAndRenderGithubData();
    fetchAndRenderMediumData();
    registerServiceWorker();
    enablePushNotificationsSubscriptions();
});

function fetchAndRenderGithubData() {
    ifm('/github').then((response) => {
        const projects = $('.projects');
        response.forEach((project) => {
            const projectTemplate = $('template#project').innerHTML;
            const rendered = element(template(projectTemplate, project));
            projects.appendChild(rendered);
        });
    });
}

function fetchAndRenderMediumData() {
    ifm('/medium').then((response) => {
        const latestPostTemplate = $('template#latest-post').innerHTML;
        const rendered = element(template(latestPostTemplate, response));
        $('.latest-post-placeholder').replaceWith(rendered);
    });
}

function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js')
            .then(() => console.log('Service worker registered.'))
            .catch((error) => console.error(error));
    }
}
