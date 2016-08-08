var path = require('path');
var express = require('express');
var nunjucks = require('nunjucks');
var morgan = require('morgan');
var winston = require('winston');
var config = require('./config');


var app = express();

app.use(morgan('dev'));

app.set('views', path.join(__dirname, 'views'));
nunjucks.configure(app.get('views'), { express: app });

app.listen(config.get('PORT'), function() {
    winston.info('Server is now running at port ' + config.get('PORT'));
});


app.use('/static', express.static(path.join(__dirname, 'static')));

app.get('/', function(request, response) {
    response.render('index.html');
});
