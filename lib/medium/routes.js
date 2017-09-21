const router = new require('express').Router();
const {
    getFormattedLatestBlogPosts,
    insertLatestBlogPost
} = require('./index');

router.get('/', (req, res) => {
    getFormattedLatestBlogPosts().then((posts) => {
        const response = posts[0];
        res.json(response);
    });
});

router.post('/webhook', (req, res) => {
    const data = req.body;
    data.uniqueSlug = data.url.split('/').pop();
    data.firstPublishedAt = data.date;
    console.log(data);

    insertLatestBlogPost(data)
        .then(() => {
            // TODO: Send push notifications
            res.status(200).end();
        })
        .catch(() => res.status(500).end())
});

module.exports = router;
