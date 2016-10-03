'use strict';
var mongoose = require('mongoose'),
    Recipient = require("../models/recipient"),
    response = require("../response"),
    history = require("./history");

module.exports = {
  load: function(req, res) {
    var userId = mongoose.Types.ObjectId(req.decoded.user._id),
        filter = {},
        pipeline = [
          {$project: {donation:"$donations", "recipient":{_id:"$_id", name:"$name"}}},
          {$unwind: "$donation"},
          {$sort: {"donation.dtPaid" : -1}}
        ];

    filter['userId'] = userId;
    if (req.params.id) {
      //Filter by recipient Id if it exists
      filter['_id'] = mongoose.Types.ObjectId(req.params.id);
    };
    pipeline.unshift({$match:filter});

    Recipient.aggregate(pipeline, function(err, donations) {
      response.handleError(err, res, 500, 'Error loading donations', function(){
        response.handleSuccess(res, donations, 200, 'Loaded donations');
      });
    });
  },
  loadOne: function(req, res) {
    var userId = mongoose.Types.ObjectId(req.decoded.user._id),
        donationId = mongoose.Types.ObjectId(req.params.id);
    Recipient.findOne({userId: userId, "donations._id": donationId}, {"donations.$":1}, function(err, donation) {
      response.handleError(err, res, 500, 'Error loading donation', function(){
        response.handleSuccess(res, donation, 200, 'Loaded donation');
      });
    });
  },
  add: function(req, res) {
    var userId = mongoose.Types.ObjectId(req.decoded.user._id),
        recipientId =  mongoose.Types.ObjectId(req.body.recipientId),
        updateHistory = history.setHistory('Added Donation', req.decoded.user);
    Recipient.findOne({userId: userId, _id: recipientId}, function(err, doc) {
      response.handleError(err, res, 500, 'Error finding recipient "' + req.body.recipientId + '"', function(){
        doc.donations.push(req.body.donation);
        doc.updateLog.push(updateHistory);
        if (doc.updateLog.length > history.recipientCutOff) {
          doc.updateLog.shift();
        }
        doc.save(function(err, result) {
          response.handleError(err, res, 500, 'Error saving donation', function(){
            response.handleSuccess(res, doc.donations[doc.donations.length -1], 200, 'Saved donation');
          });
        })
      });
    });
  },
  update: function(req, res) {
    var userId = mongoose.Types.ObjectId(req.decoded.user._id),
        donationId = mongoose.Types.ObjectId(req.body._id);

    Recipient.findOneAndUpdate(
      {userId: userId, "donations._id": donationId},
      {$set: {"donations.$": req.body}},
      function(err, doc) {
        response.handleError(err, res, 500, 'Error updating donation', function(){
          var subdoc = doc.donations.id(donationId);
          response.handleSuccess(res, subdoc, 200, 'Updated donation');
        });
      }
    );
  },
  remove: function(req, res) {
    var userId = mongoose.Types.ObjectId(req.decoded.user._id),
        donationId = mongoose.Types.ObjectId(req.params.donationId),
        recipientId = mongoose.Types.ObjectId(req.params.recipientId);
    Recipient.findOne({_id:recipientId}, function(err, doc) {
      response.handleError(err, res, 500, 'Error finding recipient', function(){
        var subdoc = doc.donations.id(donationId);
        if (!subdoc) {
          response.handleError(err, res, 500, 'Donation not found', function(){});
        } else {
          subdoc.remove();
          doc.save(function(err) {
            response.handleError(err, res, 500, 'Error removing donation', function(){
              response.handleSuccess(res, null, 200, 'Removed donation');
            })
          });
        }
      });
    });
  }
}
