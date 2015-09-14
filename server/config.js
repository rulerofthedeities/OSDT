var express = require('express'),
	routes = require('./routes'),
	exphbs = require('express-handlebars'),
	bodyParser = require('body-parser');

module.exports = function(app) {
	//register handlebars as view rendering engine
	app.engine('.hbs', exphbs.create({
		defaultLayout: 'main',
    	extname      : '.hbs',
		layoutsDir: app.get('views') + '/layouts',
		partialsDir: [app.get('views') + '/partials']
	}).engine);
	app.set('view engine', '.hbs');

	app.use(bodyParser.urlencoded({ extended: false }));
	routes.initialize(app, express.Router());

	return app;
};