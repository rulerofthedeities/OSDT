'use strict';
var Currency = require("../models/currency"),
    response = require("../response");

module.exports = {
  load: function(req, res) {
    Currency.find({}, {}, {sort:{name:1}}, function(err, docs) {
      response.handleError(err, res, 500, 'Error loading currencies', function(){
        response.handleSuccess(res, docs, 200, 'Loaded currencies');
      });
    });
  }
}
