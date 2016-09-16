'use strict';
var Currency = require("../models/currency"),
    response = require("../response");

module.exports = {
  load: function(req, res) {
    Currency.find({}, function(err, docs) {
      response.handleError(err, res, 500, 'Error loading currencies', function(){
        response.handleSuccess(res, docs, 200, 'Loaded currencies');
      });
    });
  },
  setDefault: function(req, res) {
    Currency.update({isDefault: true}, {$set:{isDefault: false}}, function(err, result) {
      response.handleError(err, res, 500, 'Error updating default currency', function(){
        Currency.findByIdAndUpdate(req.params.id, {$set:{isDefault: true}}, function(err, currency){
          response.handleError(err, res, 500, 'Error setting new default currency', function(){
            response.handleSuccess(res, currency, 200, 'Updated default currency');
          })
        })
      })
    })
  }
}
