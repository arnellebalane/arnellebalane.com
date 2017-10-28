const router = new require('express').Router();
const { getLatestRepositories } = require('../github');
const { getLatestBlogPosts } = require('../medium');

router.get('/', (req, res) => {
    Promise.all([
        getLatestRepositories(),
        getLatestBlogPosts()
    ]).then(([repositories, posts]) => {
        const context = {
            projects: repositories.slice(0, 3),
            latestPost: posts[0]
        };
        res.render('amp/index.html', context);
    });
});

module.exports = router;
