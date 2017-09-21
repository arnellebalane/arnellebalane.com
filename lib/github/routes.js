const router = new require('express').Router();
const {
    getFormattedLatestRepositories,
    insertLatestRepository
} = require('./index');

router.get('/', (req, res) => {
    getFormattedLatestRepositories().then((repositories) => {
        const response = repositories.slice(0, 3);
        res.json(response);
    });
});

router.post('/webhook', (req, res) => {
    insertLatestRepository(req.body)
        .then(() => res.status(200).end())
        .catch(() => res.status(500).end());
});

module.exports = router;
