const router = new require('express').Router();
const {
    getFormattedLatestBlogPosts,
    fetchLatestBlogPosts
} = require('./index');

router.get('/', (req, res) => {
    getFormattedLatestBlogPosts().then((posts) => {
        const response = posts[0];
        res.json(response);
    });
});

router.post('/webhook', (req, res) => {
    fetchLatestBlogPosts()
        .then(() => res.status(200).end())
        .catch(() => res.status(500).end())
});

module.exports = router;
