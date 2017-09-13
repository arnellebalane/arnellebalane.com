import { $, template, element } from './lib/utils.js';
import { mirror } from './lib/idb-fetch-mirror.js';

document.addEventListener('DOMContentLoaded', () => {
    fetchApiData();
    registerServiceWorker();
});

function fetchApiData() {
    mirror('/github-activity').then((response) => {
        const projects = $('.projects');
        response.forEach((project) => {
            const projectTemplate = $('template#project').innerHTML;
            const rendered = element(template(projectTemplate, project));
            projects.appendChild(rendered);
        });
    });
}

function registerServiceWorker() {
    if (navigator.serviceWorker) {
        navigator.serviceWorker.register('sw.js')
            .then(() => console.log('Service worker registered.'))
            .catch((error) => console.error(error));
    }
}
