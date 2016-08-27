const path = require('path');
const express = require('express');
const consolidate = require('consolidate');
const morgan = require('morgan');
const winston = require('winston');
const config = require('./config');


const app = express();

app.use(morgan('dev'));

app.engine('html', consolidate.nunjucks);
app.set('views', path.join(__dirname, 'views'));

app.listen(config.get('PORT'),
    () => winston.info(`Server is now running at port ${config.get('PORT')}`));


if (config.get('NODE_ENV') === 'production') {
    app.use('/static', express.static(path.join(__dirname, 'build')));
} else {
    app.use('/static', express.static(path.join(__dirname, 'static')));
}


app.get('/', function(request, response) {
    response.render('index.html');
});
