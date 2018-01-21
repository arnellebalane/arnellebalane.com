const router = new require('express').Router();
const { getLatestRepositories } = require('../github');
const { getLatestBlogPosts } = require('../medium');
const { getUpcomingTalk } = require('../talks');

router.get('/', (req, res) => {
    Promise.all([
        getLatestRepositories(),
        getLatestBlogPosts(),
        getUpcomingTalk()
    ]).then(([repositories, posts, upcomingTalk]) => {
        const context = {
            projects: repositories.slice(0, 3),
            latestPost: posts[0],
            upcomingTalk: upcomingTalk
        };
        res.render('amp/index.html', context);
    });
});

module.exports = router;
