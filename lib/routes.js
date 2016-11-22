const express = require('express');
const router = new express.Router();


router.use('/sw.js', express.static(`${__dirname}/../static/javascripts/sw.js`));

router.get('/', (req, res) => res.render('index.html'));


module.exports = router;
