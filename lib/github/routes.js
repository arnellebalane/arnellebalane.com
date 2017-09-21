const router = new require('express').Router();
const { fetchLatestRepositories } = require('./index');

router.get('/', (req, res) => {
    fetchLatestRepositories().then((repositories) => {
        const recentActiveRepos = repositories.slice(0, 3).map((repository) => ({
            name: repository.name,
            description: repository.description,
            url: repository.html_url
        }))
        res.json(recentActiveRepos);
    });
});

module.exports = router;
