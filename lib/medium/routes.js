const router = new require('express').Router();
const { getLatestBlogPosts } = require('./index');

router.get('/', (req, res) => {
    getLatestBlogPosts()
        .then((posts) => res.json(posts[0]))
});

module.exports = router;
