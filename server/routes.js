var path = require("path"),
    currencies = require("./controllers/currencies"),
    recipients = require("./controllers/recipients"),
    donations = require("./controllers/donations"),
    users = require("./controllers/users");

module.exports.initialize = function(app, router) {
  var home = path.resolve(__dirname + '/../public/index.html');

  router.get('/', function(request, response){
    response.sendFile(home);
  });

  router.get('/currencies', currencies.load);
  router.get('/recipients', recipients.load);
  router.get('/recipients/:id', recipients.loadOne);
  router.get('/donations', donations.load);
  router.get('/donations/:id', donations.load);

  router.post('/donations', donations.add);
  router.put('/donations', donations.update);

  router.post('/user/signin', users.signin);
  router.post('/user/signup', users.signup);
  router.get('/user/check', users.check);

  app.use('/api/', router);

};
