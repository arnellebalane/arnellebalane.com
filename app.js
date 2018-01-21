const path = require('path');
const express = require('express');
const bodyparser = require('body-parser');
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
const expressStaticOptions = {
    maxage: '1h'
};

app.engine('html', consolidate.nunjucks);
app.set('views', VIEWS_PATH);

app.use(helmet());
app.use(morgan('dev'));
app.use(bodyparser.json());
app.use(favicon(FAVICON_PATH));
app.use('/static', express.static(STATIC_PATH, expressStaticOptions));
app.use('/sw.js', express.static(SERVICE_WORKER_PATH));
app.use('/sw-offline-google-analytics.js',
    express.static(OFFLINE_GOOGLE_ANALYTICS_PATH, expressStaticOptions));
app.use((req, res, next) => {
    res.locals.req = req;
    next();
});

app.use('/github', require('./lib/github/routes'));
app.use('/medium', require('./lib/medium/routes'));
app.use('/upcoming-talk', require('./lib/talks/routes'));
app.use('/amp', require('./lib/amp/routes'));
app.use('/subscriptions', require('./lib/notifications/routes'));

app.get('/', (req, res) => {
    const pushAssets = [
        '<static/stylesheets/main.css>; rel=preload; as=style',
        '<static/images/avatar.webp>; rel=preload; as=image',
        '<static/images/sprites.png>; rel=preload; as=image'
    ];
    res.set('Link', pushAssets.join(', '));
    res.render('index.html');
});

module.exports = app;
