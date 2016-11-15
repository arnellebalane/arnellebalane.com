const path = require('path');
const express = require('express');
const consolidate = require('consolidate');
const favicon = require('serve-favicon');
const morgan = require('morgan');
const helmet = require('helmet');
const config = require('./config');


const app = express();

app.engine('html', consolidate.nunjucks);
app.set('views', path.join(__dirname, 'views'));

app.use(favicon(path.join(__dirname, 'static', 'images', 'favicon.ico')));
app.use(helmet({ nocache: false }));
app.use(morgan('dev'));

if (config.get('NODE_ENV') === 'production') {
    app.use('/static', express.static(path.join(__dirname, 'build', 'static')));
} else {
    app.use('/static', express.static(path.join(__dirname, 'static')));
}

app.use(require('./lib/routes'));


module.exports = app;
