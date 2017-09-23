const router = new require('express').Router();
const {
    addSubscription,
    removeSubscription
} = require('./index');

router.post('/add', (req, res) => {
    addSubscription(req.body)
        .then(() => res.status(200).end())
        .catch(() => res.status(500).end());
});

router.post('/remove', (req, res) => {
    removeSubscription(req.body)
        .then(() => res.status(200).end())
        .catch(() => res.status(500).end());
});

module.exports = router;
