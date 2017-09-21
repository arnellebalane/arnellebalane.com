const router = new require('express').Router();
const { getLatestRepositories } = require('../github');

router.get('/', (req, res) => {
    getLatestRepositories().then((repositories) => {
        const context = {
            projects: repositories.slice(0, 3).map((repository) => ({
                name: repository.name,
                description: repository.description,
                url: repository.html_url
            }))
        };
        res.render('amp/index.html', context);
    });
});

module.exports = router;
