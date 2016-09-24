'use strict';
var mongoose = require('mongoose'),
    Recipient = require("../models/recipient"),
    response = require("../response");

module.exports = {
  load: function(req, res) {
    var userId = mongoose.Types.ObjectId(req.decoded.user._id),
        filter = {},
        pipeline = [
          {$project: {cnt: {$size:'$donations'}, name:1, isActive:1}},
          {$sort:{name:1}}
        ];

    filter['userId'] = userId;
    if (req.query.active === "1"){
      filter['isActive'] = true;
    }
    pipeline.unshift({$match:filter});

    Recipient.aggregate(pipeline, function(err, docs) {
      response.handleError(err, res, 500, 'Error loading recipients', function(){
        response.handleSuccess(res, docs, 200, 'Loaded recipients');
      });
    });
  },
  loadOne: function(req, res) {
    var userId = mongoose.Types.ObjectId(req.decoded.user._id);
    Recipient.find({_id:req.params.id, userId:userId}, {donations:0}, function(err, doc) {
      response.handleError(err, res, 500, 'Error loading recipient', function(){
        response.handleSuccess(res, doc[0], 200, 'Loaded recipient');
      });
    });
  },
  add: function(req, res) {
    var recipient = new Recipient(req.body);
    recipient.userId = mongoose.Types.ObjectId(req.decoded.user._id);
    recipient.save(function(err, result) {
      response.handleError(err, res, 500, 'Error adding recipient', function(){
        response.handleSuccess(res, result, 200, 'Added recipient');
      });
    });
  },
  update: function(req, res) {
    var doc = req.body,
        userId = mongoose.Types.ObjectId(req.decoded.user._id);
    Recipient.update({_id:doc._id, userId: userId}, {$set: {
      name: doc.name, 
      description: doc.description, 
      isActive: doc.isActive, 
      categories: doc.categories
    }}, function (err, recipient) {
      response.handleError(err, res, 500, 'Error updating recipient', function(){
          response.handleSuccess(res, recipient, 200, 'Updated recipient');
        });
      }
    );
  },
  getCats: function(req, res) {
  var query = req.query.search, 
      max = req.query.max ? parseInt(req.query.max, 10) : 20,
      userId = mongoose.Types.ObjectId(req.decoded.user._id);

  Recipient
    .aggregate([
      {$match: {userId: userId}},
      {$unwind: "$categories" },
      {$match: {categories: {$regex:query, $options:"i"}}},
      {$group: {_id:"$categories"}},
      {$sort: {_id: 1}},
      {$limit: max},
      {$project: {_id:0, name:"$_id"}}
    ], function(err, docs) {
      response.handleError(err, res, 500, 'Error loading categories', function(){
        response.handleSuccess(res, docs, 200, 'Loaded categories');
      });
    });
  }
}
