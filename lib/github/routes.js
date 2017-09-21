const router = new require('express').Router();
const { getLatestRepositories } = require('./index');

router.get('/', (req, res) => {
    getLatestRepositories().then((repositories) => {
        const response = repositories.slice(0, 3).map((repository) => ({
            name: repository.name,
            description: repository.description,
            url: repository.html_url
        }));
        res.json(response);
    });
});

module.exports = router;
