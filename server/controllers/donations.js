'use strict';
var mongoose = require('mongoose'),
    Recipient = require("../models/recipient"),
    response = require("../response");

module.exports = {
  load: function(req, res) {
    var pipeline = [
      {$project: {donation:"$donations", "recipientId":"$_id"}},
      {$unwind: "$donation"}
    ];
    Recipient
      .aggregate(pipeline, function(err, donations) {
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
        doc.save(function(err, result) {
          response.handleError(err, res, 500, 'Error saving donation', function(){
            response.handleSuccess(res, doc.donations[doc.donations.length -1], 200, 'Saved donation');
          });
        })
      });
    });
  },
  update: function(req, res) {
    console.log('updating donation', req.body);
    var donationId = req.body._id;

    Recipient.findOneAndUpdate(
      { "donations._id": donationId },
      { 
        "$set": {
          "donations.$": req.body
        }
      },
      function(err,doc) {
        console.log('updated', doc);
      }
    );
    /*
    Donation.findById(req.body._id, function(err, doc){
      console.log('found', doc);
    })
    */
  }
}
