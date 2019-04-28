module.exports = (label, url, classes=[]) => {
    return `
        <a
            class="${classes.join(' ')}"
            href="${url}"
            target="_blank"
            rel="noopener noreferrer"
        >
            ${label}
        </a>
    `;
};
