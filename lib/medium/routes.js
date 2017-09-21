const router = new require('express').Router();
const { getFormattedLatestBlogPosts } = require('./index');

router.get('/', (req, res) => {
    getFormattedLatestBlogPosts().then((posts) => {
        const response = posts[0];
        res.json(response);
    });
});

module.exports = router;
