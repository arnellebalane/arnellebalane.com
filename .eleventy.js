module.exports = config => {
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
