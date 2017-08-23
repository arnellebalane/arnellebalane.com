mirror('/github-activity').then((response) => {
    const projects = $('.projects');
    response.forEach((project) => {
        const projectTemplate = $('template#project').innerHTML;
        const rendered = element(template(projectTemplate, project));
        projects.appendChild(rendered);
    });
});

function $(selector, context = document) {
    return context.querySelector(selector);
}

function template(tmpl, context = {}) {
    return Object.keys(context).reduce((rendered, key) => {
        const value = context[key];
        if (value) {
            const pattern = new RegExp(`{{\\s*[#/]${key}\\s*}}`, 'g');
            rendered = rendered.replace(pattern, '');
        } else {
            const pattern = new RegExp(`{{\\s*#${key}\\s*}}[\\s\\S]+?{{\\s*/${key}\\s*}}`, 'm');
            rendered = rendered.replace(pattern, '');
        }
        const pattern = new RegExp(`{{\\s*${key}\\s*}}`);
        return rendered.replace(pattern, value);
    }, tmpl);
}

function element(tmpl, stage = document.createElement('div')) {
    stage.innerHTML = tmpl;
    return stage.firstElementChild;
}



// Make web app "progressive"

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
