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
        const pattern = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
        return rendered.replace(pattern, value);
    }, tmpl);
}

function element(tmpl, stage = document.createElement('div')) {
    stage.innerHTML = tmpl;
    return stage.firstElementChild;
}

function publicKeyToUint8Array(publicKey) {
    const padding = '='.repeat((4 - publicKey.length % 4) % 4);
    const base64 = (publicKey + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }

    return outputArray;
}
