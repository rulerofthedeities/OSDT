var path = require("path"),
    jwt = require('jsonwebtoken'),
    currencies = require("./controllers/currencies"),
    recipients = require("./controllers/recipients"),
    donations = require("./controllers/donations"),
    xchange = require("./controllers/xchange"),
    stats = require("./controllers/stats"),
    users = require("./controllers/users"),
    response = require("./response");

module.exports.initialize = function(app, router) {
  var home = path.resolve(__dirname + '/../public/index.html');

  router.get('/', function(req, res){
    res.sendFile(home);
  });

  router.use(['/user/refresh', '/user/signin'], function(req, res, next) {
    req.expiresIn = app.get('token_expiration') || 86400;
    next();
  });

  router.post('/user/signin', users.signin);
  router.post('/user/signup', users.signup);
  router.get('/user/check', users.check);

  router.post('/xchange/:time', xchange.getExchangeRate);

  router.use('/', function(req, res, next) {
    jwt.verify(req.token, process.env.JWT_TOKEN_SECRET, function(err, decoded) {
      response.handleError(err, res, 401, 'Authentication failed', function(){
        req.decoded = decoded;
        next();
      });
    });
  });

  router.patch('/user/refresh', users.refreshToken);
  router.get('/user/name', users.getUserName);
  router.get('/user/access', users.getUserAccess);
  router.get('/settings', users.getSettings);
  
  router.patch('/currencies/:id', users.setDefaultCurrency);
  router.get('/currencies', currencies.load);

  router.get('/donations', donations.load);
  router.get('/donations/recipients/:id', donations.load);
  router.get('/donations/:id', donations.loadOne);
  router.post('/donations', donations.add);
  router.put('/donations', donations.update);
  router.delete('/donations/:donationId/:recipientId', donations.remove);

  router.get('/recipients', recipients.load);
  router.get('/recipients/check', recipients.check);
  router.get('/recipients/:id', recipients.loadOne);
  router.post('/recipients', recipients.add);
  router.put('/recipients', recipients.update);
  router.patch('/recipients', recipients.updateActive);
  router.get('/cats', recipients.getCats);

  router.get('/stats/totals', stats.getTotals);
  router.get('/stats/totals/:currency', stats.getTotals);
  router.get('/stats/lists', stats.getLists);
  router.get('/stats/lists/:currency', stats.getLists);

  app.use('/api/', router);

};
