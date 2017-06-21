const path = require('path');
const express = require('express');
const consolidate = require('consolidate');
const morgan = require('morgan');
const favicon = require('serve-favicon');

const app = express();

app.engine('html', consolidate.nunjucks);
app.set('views', path.join(__dirname, 'views'));

app.use(morgan('dev'));
app.use(favicon(path.join(__dirname, 'static', 'images', 'icon-16.png')));
app.use('/static', express.static(path.join(__dirname, 'static')));

app.get('/', (req, res) => res.render('index.html'));

module.exports = app;
