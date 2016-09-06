'use strict';
var mongoose = require('mongoose'),
    Recipient = require("../models/recipient"),
    response = require("../response");

module.exports = {
  load: function(req, res) {
    var pipeline = [
      {$project: {donation:"$donations", "recipientId":"$_id"}},
      {$unwind: "$donation"},
      {$sort: {"donation.dtPaid" : -1}}
    ];
    if (req.params.id) {
      //Filter by recipient Id if it exists
      var mongoId = mongoose.Types.ObjectId(req.params.id);
      pipeline.unshift({$match:{_id: mongoId}});
    };
    Recipient.aggregate(pipeline, function(err, donations) {
      response.handleError(err, res, 500, 'Error loading donations', function(){
        response.handleSuccess(res, donations, 200, 'Loaded donations');
      });
    });
  },
  add: function(req, res) {
    console.log('adding ', req.body);
    var recipientId =  mongoose.Types.ObjectId(req.body.recipientId);
    Recipient.findById(recipientId, function(err, doc) {
      response.handleError(err, res, 500, 'Error finding recipient "' + req.body.recipientId + '"', function(){
        doc.donations.push(req.body.donation);
        doc.save(function(err, result) {
          response.handleError(err, res, 500, 'Error saving donation', function(){
            response.handleSuccess(res, doc.donations[doc.donations.length -1], 200, 'Saved donation');
          });
        })
      });
    });
  },
  update: function(req, res) {
    var donationId = req.body._id;

    Recipient.findOneAndUpdate(
      {"donations._id": donationId},
      {"$set": {"donations.$": req.body}},
      function(err, doc) {
        response.handleError(err, res, 500, 'Error updating donation', function(){
            response.handleSuccess(res, doc, 200, 'Updated donation');
          });
      }
    );
  }
}
