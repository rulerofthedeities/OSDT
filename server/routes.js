var path = require("path"),
    currencies = require("./controllers/currencies");

module.exports.initialize = function(app, router) {
  var home = path.resolve(__dirname + '/../public/index.html');

  router.get('/', function(request, response){
    response.sendFile(home);
  });

  router.get('/currencies', currencies.load);

  app.use('/api/', router);

};
