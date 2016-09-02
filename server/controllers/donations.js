'use strict';
var mongoose = require('mongoose'),
    Recipient = require("../models/recipient"),
    response = require("../response");

module.exports = {
  load: function(req, res) {
    var pipeline = [
      {$project: {donations:1, dtPaid:1, _id:0}},
      {$unwind: "$donations"},
      {$sort: {"dtPaid":-1}}
    ];
    Recipient
      .aggregate(pipeline, function(err, donations) {
        console.log("resulting donations", donations);
        response.handleError(err, res, 500, 'Error loading donations', function(){
          response.handleSuccess(res, donations, 200, 'Loaded donations');
        });
      });
  },
  add: function(req, res) {
    var recipientId =  mongoose.Types.ObjectId(req.body.recipientId);
    Recipient.findById(recipientId, function(err, doc) {
      response.handleError(err, res, 500, 'Error finding recipient "' + req.body.recipientId + '"', function(){
        doc.donations.push(req.body);
        doc.save(function(err) {
          response.handleError(err, res, 500, 'Error saving donation', function(){
            response.handleSuccess(res, null, 200, 'Saved donation');
          });
        })
      });
    });
  }
}
