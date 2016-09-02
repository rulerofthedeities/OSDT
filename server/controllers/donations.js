'use strict';
var Recipient = require("../models/recipient"),
    response = require("../response");

module.exports = {
  load: function(req, res) {
    Recipient.find({'donations.1':{$exists: true}}, function(err, docs) {
      response.handleError(err, res, 500, 'Error loading donations', function(){
        response.handleSuccess(res, docs, 200, 'Loaded donations');
      });
    });
  }
}
