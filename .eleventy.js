module.exports = config => {
    config.addFilter('filterUpcomingEvents', require('./source/_filters/filterUpcomingEvents'));
    config.addFilter('filterPreviousEvents', require('./source/_filters/filterPreviousEvents'));
    config.addFilter('formatDate', require('./source/_filters/formatDate'));

    return {
        templateFormats: [
            // These are recognized template formats and will be processed
            // by Eleventy.
            'njk', 'md', 'html',

            // These are unrecognized template formats and will just be copied
            // directly by Eleventy.
            'css', 'jpg', 'svg', 'ttf'
        ]
    };
};
