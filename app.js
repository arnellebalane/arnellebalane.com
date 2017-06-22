const path = require('path');
const express = require('express');
const consolidate = require('consolidate');
const morgan = require('morgan');
const favicon = require('serve-favicon');

const app = express();

app.engine('html', consolidate.nunjucks);
app.set('views', path.join(__dirname, 'views'));

const FAVICON_PATH = path.join(__dirname, 'static', 'images', 'icon-16.png');
const STATIC_PATH = path.join(__dirname, 'static');
const SERVICE_WORKER_PATH = path.join(__dirname, 'static', 'javascripts', 'sw.js');

app.use(morgan('dev'));
app.use(favicon(FAVICON_PATH));
app.use('/static', express.static(STATIC_PATH));
app.use('/sw.js', express.static(SERVICE_WORKER_PATH));

app.get('/', (req, res) => res.render('index.html'));

module.exports = app;
