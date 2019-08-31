module.exports = config => {
    config.addFilter('filterUpcomingEvents', require('./source/_filters/filterUpcomingEvents'));
    config.addFilter('filterPreviousEvents', require('./source/_filters/filterPreviousEvents'));
    config.addFilter('filterProjects', require('./source/_filters/filterProjects'));
    config.addFilter('filterLibraries', require('./source/_filters/filterLibraries'));
    config.addFilter('formatDate', require('./source/_filters/formatDate'));
    config.addFilter('formatPageTitle', require('./source/_filters/formatPageTitle'));
    config.addShortcode('externalLink', require('./source/_shortcodes/externalLink'));

    config.addPassthroughCopy('source/static');
};
