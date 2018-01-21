const router = new require('express').Router();
const { getUpcomingTalk } = require('./index');

router.get('/', (req, res) => {
    getUpcomingTalk()
        .then((talk) => res.json(talk));
});

module.exports = router;
