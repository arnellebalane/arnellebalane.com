const path = require('path');
const express = require('express');
const consolidate = require('consolidate');
const helmet = require('helmet');
const morgan = require('morgan');
const favicon = require('serve-favicon');
const config = require('./config');

const app = express();

const VIEWS_PATH = config.get('NODE_ENV') === 'production'
    ? path.join(__dirname, 'build', 'views')
    : path.join(__dirname, 'views');
const STATIC_PATH = config.get('NODE_ENV') === 'production'
    ? path.join(__dirname, 'build', 'static')
    : path.join(__dirname, 'static');
const FAVICON_PATH = path.join(STATIC_PATH, 'images', 'icon-16.png');
const SERVICE_WORKER_PATH = path.join(STATIC_PATH, 'javascripts', 'sw.js');
const OFFLINE_GOOGLE_ANALYTICS_PATH = path.join(__dirname, 'node_modules',
    'sw-offline-google-analytics', 'build', 'importScripts',
    'sw-offline-google-analytics.prod.v0.0.25.js');

app.engine('html', consolidate.nunjucks);
app.set('views', VIEWS_PATH);

app.use(helmet());
app.use(morgan('dev'));
app.use(favicon(FAVICON_PATH));
app.use('/static', express.static(STATIC_PATH));
app.use('/sw.js', express.static(SERVICE_WORKER_PATH));
app.use('/sw-offline-google-analytics.js',
    express.static(OFFLINE_GOOGLE_ANALYTICS_PATH));

app.get('/', (req, res) => res.render('index.html'));

module.exports = app;
