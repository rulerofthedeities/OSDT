'use strict';
var Recipient = require("../models/recipient"),
    response = require("../response");

module.exports = {
  load: function(req, res) {
    var pipeline = [
      {$project: {cnt: {$size:'$donations'}, name:1, isActive:1}},
      {$sort:{name:1}}
    ];
    if (req.query.active === "1"){
      pipeline.unshift({$match:{isActive:true}});
    }
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
  },
  add: function(req, res) {
    var recipient = new Recipient(req.body);
    recipient.save(function(err, result) {
      response.handleError(err, res, 500, 'Error adding recipient', function(){
        response.handleSuccess(res, result, 200, 'Added recipient');
      });
    });
  },
  update: function(req, res) {
    var doc = req.body;
    Recipient.findByIdAndUpdate(doc._id, {$set: {
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
  }
}
