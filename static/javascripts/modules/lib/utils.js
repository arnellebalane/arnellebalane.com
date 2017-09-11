export function $(selector, context = document) {
    return context.querySelector(selector);
}

export function template(tmpl, context = {}) {
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

export function element(tmpl, stage = document.createElement('div')) {
    stage.innerHTML = tmpl;
    return stage.firstElementChild;
}
