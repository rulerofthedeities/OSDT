module.exports = {
	index: function(request, response) {
		var viewModel = {name: "test"};
		response.render('index', viewModel);
	}
};




'use strict';

var express = require('express'),
	app = express();

app.get('/', function (req, res) {
	res.send('hello');
});

app.listen(3000, function () {
	console.log('express-handlebars example server listening on: 3000');
});