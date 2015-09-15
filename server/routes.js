var home = require('../controllers/home'),
	donation = require('../controllers/donation');

module.exports.initialize = function(app, router) {
	router.get('/', home.index);
	router.post('/comment', donation.add);

	app.use(router);
};
