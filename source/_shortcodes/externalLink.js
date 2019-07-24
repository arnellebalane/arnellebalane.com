module.exports = (text, href, classes='') => {
    return `
        <a
            href="${href}"
            target="_blank"
            rel="noopener noreferrer"
            class="${classes}"
        >
            ${text}
        </a>
    `;
};
