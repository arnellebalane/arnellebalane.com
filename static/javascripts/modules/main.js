import { $, template, element } from './lib/utils.js';
import mirror from './lib/idb-fetch-mirror.js';
import enablePushNotificationsSubscriptions from './lib/push-notifications.js';

document.addEventListener('DOMContentLoaded', () => {
    fetchAndRenderGithubData();
    fetchAndRenderMediumData();
    fetchAndRenderTalkData();
    registerServiceWorker();
    enablePushNotificationsSubscriptions();
});

function fetchAndRenderGithubData() {
    mirror('/github').then((response) => {
        const projects = $('.projects');
        response.forEach((project) => {
            const projectTemplate = $('template#project').innerHTML;
            const rendered = element(template(projectTemplate, project));
            projects.appendChild(rendered);
        });
    });
}

function fetchAndRenderMediumData() {
    mirror('/medium').then((response) => {
        const latestPostTemplate = $('template#latest-post').innerHTML;
        const rendered = element(template(latestPostTemplate, response));
        $('.latest-post-placeholder').replaceWith(rendered);
    });
}

function fetchAndRenderTalkData() {
    mirror('/upcoming-talk').then((response) => {
        response = response || {};
        const upcomingTalkTemplate = $('template#upcoming-talk').innerHTML;
        const rendered = element(template(upcomingTalkTemplate, response));
        $('.upcoming-talk-placeholder').replaceWith(rendered);
    })
}

function registerServiceWorker() {
    if (navigator.serviceWorker) {
        navigator.serviceWorker.register('sw.js')
            .then(() => console.log('Service worker registered.'))
            .catch((error) => console.error(error));
    }
}
