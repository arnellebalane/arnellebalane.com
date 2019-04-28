module.exports = config => {
    config.addShortcode('externalLink', require('./source/utils/shortcodes/externalLink'));

    return {
        dir: {
            input: 'source',
            output: '_site'
        },
        templateFormats: [
            // Regular templates
            'html', 'njk', 'md',

            // Static files that needs to be copied (passthrough)
            'css', 'ttf', 'jpg', 'png', 'svg'
        ]
    };
};
