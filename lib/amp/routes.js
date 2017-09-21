const router = new require('express').Router();
const { format } = require('date-fns');
const { getLatestRepositories } = require('../github');
const { getLatestBlogPosts } = require('../medium');

router.get('/', (req, res) => {
    Promise.all([
        getLatestRepositories(),
        getLatestBlogPosts()
    ]).then(([repositories, posts]) => {
        const latestPost = posts[0];
        const context = {
            projects: repositories.slice(0, 3).map((repository) => ({
                name: repository.name,
                description: repository.description,
                url: repository.html_url
            })),
            latestPost: {
                title: latestPost.title,
                url: `https://blog.arnellebalane.com/${latestPost.uniqueSlug}`,
                date: format(new Date(latestPost.firstPublishedAt), 'MMMM D, YYYY')
            }
        };
        res.render('amp/index.html', context);
    });
});

module.exports = router;
