const router = new require('express').Router();
const { format } = require('date-fns');
const { fetchLatestMediumPosts } = require('./index');

router.get('/', (req, res) => {
    fetchLatestMediumPosts().then((posts) => {
        const latestPost = posts[0];
        const response = {
            title: latestPost.title,
            url: `https://blog.arnellebalane.com/${latestPost.uniqueSlug}`,
            date: format(new Date(latestPost.firstPublishedAt), 'MMMM D, YYYY')
        };
        res.json(response);
    });
});

module.exports = router;
