const router = new require('express').Router();
const keyval = require('../keyval');
const {
    getSubscriptions,
    sendNotification
} = require('../notifications');
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
        .then(([latestPost]) => (
            keyval.get('latest-post-url', null)
                .then((latestPostUrl) => {
                    if (latestPostUrl !== latestPost.url) {
                        const notification = {
                            title: latestPost.title,
                            body: 'in Arnelle\'s Blog',
                            icon: '/static/images/icon-144.png'
                        };
                        return getSubscriptions().then((subscriptions) => (
                            Promise.all(subscriptions.map((subscription) => (
                                sendNotification(subscription, notification)
                            )))
                        ));
                    }
                })
                .then(() => keyval.set('latest-post-url', latestPost.url))
                .then(() => res.status(200).end())
        ))
        .catch(() => res.status(500).end())
});

module.exports = router;
