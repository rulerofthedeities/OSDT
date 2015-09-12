var express = require('express'),
	routes = require('./routes'),
	exphbs = require('express-handlebars'),
	bodyParser = require('body-parser');

module.exports = function(app) {
	
	//register handlebars as view rendering engine
	app.engine('handlebars', exphbs.create({
		defaultLayout: 'main',
		layoutsDir: app.get('views') + '/layouts',
		partialsDir: [app.get('views') + '/partials']
	}).engine);
	app.set('view engine', 'handlebars');

	app.use(bodyParser.urlencoded({ extended: false }));
	routes.initialize(app, express.Router());

	return app;
};