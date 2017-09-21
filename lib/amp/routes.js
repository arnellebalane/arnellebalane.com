const router = new require('express').Router();
const { format } = require('date-fns');
const { getFormattedLatestRepositories } = require('../github');
const { getFormattedLatestBlogPosts } = require('../medium');

router.get('/', (req, res) => {
    Promise.all([
        getFormattedLatestRepositories(),
        getFormattedLatestBlogPosts()
    ]).then(([repositories, posts]) => {
        const context = {
            projects: repositories.slice(0, 3),
            latestPost: posts[0]
        };
        res.render('amp/index.html', context);
    });
});

module.exports = router;
