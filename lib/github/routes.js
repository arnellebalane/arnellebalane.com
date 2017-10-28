const router = new require('express').Router();
const { getLatestRepositories } = require('./index');

router.get('/', (req, res) => {
    getLatestRepositories()
        .then((repositories) => res.json(repositories));
});

module.exports = router;
