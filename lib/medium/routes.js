const router = new require('express').Router();
const { fetchLatestMediumPosts } = require('./index');

router.get('/', (req, res) => {
    fetchLatestMediumPosts().then((posts) => {
        const latestPost = posts[0];
        console.log(latestPost);
    });
});

module.exports = router;
