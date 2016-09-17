var path = require("path"),
    currencies = require("./controllers/currencies"),
    recipients = require("./controllers/recipients"),
    donations = require("./controllers/donations"),
    xchange = require("./controllers/xchange"),
    stats = require("./controllers/stats"),
    users = require("./controllers/users");

module.exports.initialize = function(app, router) {
  var home = path.resolve(__dirname + '/../public/index.html');

  router.get('/', function(request, response){
    response.sendFile(home);
  });

  router.get('/currencies', currencies.load);
  router.patch('/currencies/:id', currencies.setDefault);
  router.post('/xchange/:time', xchange.getExchangeRate);

  router.get('/donations', donations.load);
  router.get('/donations/recipients/:id', donations.load);
  router.get('/donations/:id', donations.loadOne);
  router.post('/donations', donations.add);
  router.put('/donations', donations.update);

  router.get('/recipients', recipients.load);
  router.get('/recipients/:id', recipients.loadOne);
  router.post('/recipients', recipients.add);
  router.put('/recipients', recipients.update);
  router.get('/cats', recipients.getCats);

  router.get('/stats/totals', stats.getTotals);
  router.get('/stats/totals/:currency', stats.getTotals);
  router.get('/stats/lists', stats.getLists);
  router.get('/stats/lists/:currency', stats.getLists);

  router.post('/user/signin', users.signin);
  router.post('/user/signup', users.signup);
  router.get('/user/check', users.check);

  app.use('/api/', router);

};
