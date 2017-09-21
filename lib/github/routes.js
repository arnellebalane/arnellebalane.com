const router = new require('express').Router();
const { getFormattedLatestRepositories } = require('./index');

router.get('/', (req, res) => {
    getFormattedLatestRepositories().then((repositories) => {
        const response = repositories.slice(0, 3);
        res.json(response);
    });
});

module.exports = router;
