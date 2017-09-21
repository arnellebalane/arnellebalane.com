document.addEventListener('DOMContentLoaded', () => {
    fetchAndRenderGithubData();
    fetchAndRenderMediumData();
    registerServiceWorker();
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
        const post = $('.latest-post');
        post.cite = response.url;
        $('a', post).href = response.url;
        $('a', post).textContent = response.title;
        $('time', post).textContent = response.date;
    });
}

function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js')
            .then(() => console.log('Service worker registered.'))
            .catch((error) => console.error(error));
    }
}
