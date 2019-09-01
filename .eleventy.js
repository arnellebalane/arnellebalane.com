module.exports = config => {
    config.addFilter('filterUpcomingEvents', require('./source/_filters/filterUpcomingEvents'));
    config.addFilter('filterPreviousEvents', require('./source/_filters/filterPreviousEvents'));
    config.addFilter('filterProjects', require('./source/_filters/filterProjects'));
    config.addFilter('filterLibraries', require('./source/_filters/filterLibraries'));
    config.addFilter('formatDate', require('./source/_filters/formatDate'));
    config.addFilter('formatPageTitle', require('./source/_filters/formatPageTitle'));
    config.addShortcode('externalLink', require('./source/_shortcodes/externalLink'));

    config.addPassthroughCopy('source/static');
    config.addPassthroughCopy('source/blog/**/assets/*');

    config.addCollection('articles', collection => {
        const externalArticles = require('./source/_data/articles.json');
        const internalArticles = collection.getFilteredByTag('article')
            .map(article => article.template.frontMatter.data)
            .filter(article => article.published);
        return [...externalArticles, ...internalArticles].sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
        });
    });
};
