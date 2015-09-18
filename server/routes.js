var home = require('../controllers/home'),
	donation = require('../controllers/donation');

module.exports.initialize = function(app, router) {
	router.get('/', home.index);
	router.post('/add', donation.add);

	app.use(router);
};
