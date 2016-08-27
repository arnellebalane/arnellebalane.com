const path = require('path');
const express = require('express');
const consolidate = require('consolidate');
const morgan = require('morgan');
const config = require('./config');


const app = express();

app.use(morgan('dev'));

app.engine('html', consolidate.nunjucks);
app.set('views', path.join(__dirname, 'views'));


if (config.get('NODE_ENV') === 'production') {
    app.use('/static', express.static(path.join(__dirname, 'build')));
} else {
    app.use('/static', express.static(path.join(__dirname, 'static')));
}


app.get('/', function(req, res) {
    res.render('index.html');
});


module.exports = app;
