const router = new require('express').Router();
const { fetchLatestMediumPosts } = require('./index');

router.get('/', (req, res) => {
    fetchLatestMediumPosts().then((posts) => {
        const latestPost = posts[0];
        const response = {
            title: latestPost.title,
            url: `https://blog.arnellebalane.com/${latestPost.uniqueSlug}`,
            date: new Date(latestPost.createdAt)
        };
        res.json(response);
    });
});

module.exports = router;
