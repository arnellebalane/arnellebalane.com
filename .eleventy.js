module.exports = config => {
    config.addFilter('filterUpcomingEvents', require('./source/_filters/filterUpcomingEvents'));
    config.addFilter('filterPreviousEvents', require('./source/_filters/filterPreviousEvents'));
    config.addFilter('filterProjects', require('./source/_filters/filterProjects'));
    config.addFilter('filterLibraries', require('./source/_filters/filterLibraries'));
    config.addFilter('formatDate', require('./source/_filters/formatDate'));
    config.addShortcode('externalLink', require('./source/_shortcodes/externalLink'));

    config.addPassthroughCopy('source/sw.js');
    config.addPassthroughCopy('source/static');
};
