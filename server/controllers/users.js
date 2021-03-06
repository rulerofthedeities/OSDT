var jwt = require('jsonwebtoken'),
    bcrypt = require('bcrypt'),
    response = require('../response'),
    User = require('../models/user'),
    saltRounds = 10;

var addUser = function(req, res, callback) {
  bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
    var user = new User({
      userName: req.body.userName,
      password: hash,
      email: req.body.email,
      settings: {defaultCurrency: 'EUR'},
      access: {level:1, roles: []}
    });
    user.save(function (err, result) {
      callback(err, result);
    });
  });
};

var findUser = function(req, res, callback) {
  User.findOne({email: req.body.email}, function (err, doc) {
    if (err) {
      callback(err, doc, 500, 'Error finding user')
    }
    if (!doc) {
      callback({error:'no user'}, doc, 500, 'User could not be found')
    }
    bcrypt.compare(req.body.password, doc.password, function(err, result) {
      if (result !== true) {
        callback({error:'Invalid password'}, doc, 401, 'Could not sign you in');
      } else {
        doc.password = null;
        var token = jwt.sign({user: doc}, process.env.JWT_TOKEN_SECRET, {expiresIn: req.expiresIn});
        callback(null, {message: 'Success', token: token});
      }
    });
  })
};

var isUniqueEmail = function(req, res, options, callback) {
  User.findOne({email:options.mail}, function(err, doc) {
    callback(err, doc !== null);
  });
}

var isUniqueUser = function(req, res, options, callback) {
  User.findOne({userName:options.user}, function(err, doc) {
    callback(err, doc !== null);
  });
}

module.exports = {
  signup: function(req, res) {
    addUser(req, res, function(err, doc) {
      response.handleError(err, res, 500, 'Error creating new user', function(){
        response.handleSuccess(res, doc, 200, 'Created new user');
      });
    });
  },
  signin: function(req, res) {
    findUser(req, res, function(err, result, errno, errmsg) {
      response.handleError(err, res, errno, errmsg, function(){
        response.handleSuccess(res, result, 200, 'Signed in successfully');
      });
    });
  },
  check: function(req, res) {
    var options = {mail:req.query.mail, user:req.query.user}
    if (options.mail) {
      isUniqueEmail(req, res, options, function(err, exists){
        response.handleError(err, res, 500, 'Error checking email', function(){
          response.handleSuccess(res, exists, 200, 'Checked email');
        });
      })
    }
    if (options.user) {
      isUniqueUser(req, res, options, function(err, exists){
        response.handleError(err, res, 500, 'Error checking user', function(){
          response.handleSuccess(res, exists, 200, 'Checked user');
        });
      })
    }
  },
  getUserName: function(req, res) {
    var userId = req.decoded.user._id;
    User.findById(userId, function (err, user) {
      response.handleError(err, res, 500, 'Error fetching user name', function(){
        response.handleSuccess(res, user.userName, 200, 'Fetched user name');
      });
    });
  },
  getUserAccess: function(req, res) {
    var userId = req.decoded.user._id;
    User.findById(userId, function (err, user) {
      response.handleError(err, res, 500, 'Error fetching user access', function(){
        response.handleSuccess(res, user.access, 200, 'Fetched user access');
      });
    });
  },
  getSettings: function(req, res) {
    var userId = req.decoded.user._id;
    User.findById(userId, function (err, user) {
      response.handleError(err, res, 500, 'Error fetching user settings', function(){
        response.handleSuccess(res, user.settings, 200, 'Fetched user settings');
      });
    });
  },
  setDefaultCurrency: function(req, res) {
    var userId = req.decoded.user._id;
    var currency = req.params.id;
    User.findByIdAndUpdate(userId, {$set:{'settings.defaultCurrency':currency}}, function(err, settings) {
      response.handleError(err, res, 500, 'Error setting new default currency', function(){
        response.handleSuccess(res, currency, 200, 'Updated default currency');
      })
    })
  },
  refreshToken: function(req, res) {
    var payload = req.decoded;
    delete payload.iat;
    delete payload.exp;
    var token = jwt.sign(payload, process.env.JWT_TOKEN_SECRET, {expiresIn: req.expiresIn});
    response.handleSuccess(res, token, 200, 'Refreshed token');
  }
}