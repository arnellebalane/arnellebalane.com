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
const OFFLINE_GOOGLE_ANALYTICS_PATH = path.join(__dirname, 'node_modules',
    'sw-offline-google-analytics', 'build', 'importScripts',
    'sw-offline-google-analytics.prod.v0.0.25.js');

app.use(morgan('dev'));
app.use(favicon(FAVICON_PATH));
app.use('/static', express.static(STATIC_PATH));
app.use('/sw.js', express.static(SERVICE_WORKER_PATH));
app.use('/sw-offline-google-analytics.js',
    express.static(OFFLINE_GOOGLE_ANALYTICS_PATH));
app.use((req, res, next) => {
    res.locals.req = req;
    next();
});

app.get('/', (req, res) => res.render('index.html'));

app.get('/github-activity', (req, res) => {
    res.json('{}');
});

module.exports = app;
