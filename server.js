'use strict';

var express = require('express'),
    app = express(),
    compression = require('compression'),
    path = require('path'),
    bodyParser = require('body-parser'),
    routes = require('./server/routes'),
    mongoose = require('mongoose');

//config
app.set('port', process.env.PORT || 5000);
app.set('env', process.env.NODE_ENV || 'development');

// view engine setup
app.set('views', path.join(__dirname, 'server/views'));
app.set('view engine', 'hbs');

//middleware
app.use(compression());
if (app.get('env') === 'development') {
  console.log('Server running in development mode');
  app.use('/node', express.static(path.join(__dirname, '/node_modules')));
}
app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.json());
app.use('/client', express.static(path.join(__dirname, '/client')));

//routing
routes.initialize(app, new express.Router());

//render index page
app.use(function (req, res, next) {
  return res.render('index');
});

//start server
var options = {
  server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
  replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
};
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/km-osdt', options, function(err) {
  app.listen(app.get('port'), function() { 
    console.log('Server up: http://localhost:' + app.get('port'));
  });
});
