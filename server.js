var path = require('path');
var express = require('express');
var consolidate = require('consolidate');
var morgan = require('morgan');
var winston = require('winston');
var config = require('./config');


var app = express();

app.use(morgan('dev'));

app.engine('html', consolidate.nunjucks);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));

app.listen(config.get('PORT'), function() {
    winston.info('Server is now running at port ' + config.get('PORT'));
});


if (config.get('NODE_ENV') === 'production') {
    app.use('/static', express.static(path.join(__dirname, 'build')));
} else {
    app.use('/static', express.static(path.join(__dirname, 'static')));
}


app.get('/', function(request, response) {
    response.render('index.html');
});
