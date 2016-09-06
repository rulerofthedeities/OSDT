'use strict';
var Recipient = require("../models/recipient"),
    response = require("../response");

module.exports = {
  load: function(req, res) {
    var pipeline = [
      {$project: {cnt: {$size:'$donations'}, name:1}}
    ];
    Recipient.aggregate(pipeline, function(err, docs) {
      response.handleError(err, res, 500, 'Error loading recipients', function(){
        response.handleSuccess(res, docs, 200, 'Loaded recipients');
      });
    });
  },
  loadOne: function(req, res) {
    Recipient.findById(req.params.id, {donations:0}, function(err, doc) {
      response.handleError(err, res, 500, 'Error loading recipient', function(){
        response.handleSuccess(res, doc, 200, 'Loaded recipient');
      });
    });
  }
}
