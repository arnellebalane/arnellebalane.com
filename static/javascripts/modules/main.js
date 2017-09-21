import { $, template, element } from './lib/utils.js';
import mirror from './lib/idb-fetch-mirror.js';

document.addEventListener('DOMContentLoaded', () => {
    fetchAndRenderGithubData();
    fetchAndRenderMediumData();
    registerServiceWorker();
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
        const post = $('.latest-post');
        post.cite = response.url;
        $('a', post).href = response.url;
        $('a', post).textContent = response.title;
        $('time', post).textContent = response.date;
    });
}

function registerServiceWorker() {
    if (navigator.serviceWorker) {
        navigator.serviceWorker.register('sw.js')
            .then(() => console.log('Service worker registered.'))
            .catch((error) => console.error(error));
    }
}
