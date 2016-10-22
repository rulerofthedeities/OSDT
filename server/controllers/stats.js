'use strict';
var mongoose = require('mongoose'),
    Recipient = require("../models/recipient"),
    response = require("../response"),
    async = require('async'),
    totals = {},
    totalsErr = null,
    defaultCurrency = 'EUR',
    userId = null;

var getRecipientCount = function(callback) {     
  Recipient.count({userId: userId}, function(err, count) {
    callback(err, count);
  });
}

var getDonationsCount = function(callback) {
  var pipeline = [
        {$match:{userId: userId}},
        {$unwind:'$donations'},
        {$group:{_id:null,count:{$sum:1}}}
      ];
  Recipient.aggregate(pipeline, function(err, count) {
    var total = count[0] ? count[0].count : 0;
    callback(err, total);
  });
}

var getDonationsPerCurrency = function(callback) {
  var pipeline = [
        {$match:{userId: userId}},
        {$unwind:'$donations'},
        {$group:{_id:'$donations.currency',count:{$sum:'$donations.amount'}}},
        {$project:{_id:0, currency:'$_id', total:'$count'}}
      ];
  Recipient.aggregate(pipeline, function(err, totals) {
    callback(err, totals);
  });
}

var getTotalAmount = function(callback) {
  var pipeline = [
        {$match:{userId: userId}},
        {$unwind:'$donations'},
        {$group:{_id:null, count:{$sum:'$donations.values.' + defaultCurrency}}},
        {$project:{_id:0, total:'$count'}}
      ];
  Recipient.aggregate(pipeline, function(err, totals) {
    var total = totals[0] ? totals[0].total : 0;
    callback(err, {total:total, currency:defaultCurrency});
  });
}

var getTotalAmountThisYear = function(callback) {
  var lastYear = new Date().getFullYear() - 1,
      cutoff = new Date(lastYear, 11, 31),
      pipeline = [
        {$match:{userId: userId}},
        {$unwind:'$donations'},
        {$match: {'donations.dtPaid':{$gt:cutoff}}},
        {$group:{_id:null, count:{$sum:'$donations.values.' + defaultCurrency}}},
        {$project:{_id:0, total:'$count'}}
      ];
  Recipient.aggregate(pipeline, function(err, totals) {
    var total = totals[0] ? totals[0].total : 0;
    callback(err, {total:total, currency:defaultCurrency});
  });
}

var getTotalAmountLastYear = function(callback) {
  var lastYear = new Date().getFullYear() - 1,
      prevYear = new Date().getFullYear() - 2,
      cutoff1 = new Date(lastYear, 11, 31),
      cutoff2 = new Date(prevYear, 11, 31),
      pipeline = [
        {$match:{userId: userId}},
        {$unwind:'$donations'},
        {$match: {$and:[{'donations.dtPaid':{$gt:cutoff2}}, {'donations.dtPaid':{$lt:cutoff1}}]}},
        {$group:{_id:null, count:{$sum:'$donations.values.' + defaultCurrency}}},
        {$project:{_id:0, total:'$count'}}
      ];
  Recipient.aggregate(pipeline, function(err, totals) {
    var total = totals[0] ? totals[0].total : 0;
    callback(err, {total:total, currency:defaultCurrency});
  });
}

var getTotalPerMonth = function(callback) {
  var pipeline = [
        {$match:{userId: userId}},
        {$unwind:'$donations'},
        {$group: {_id: {$dateToString: {format: '%Y%m', date:'$donations.dtPaid'}}, numberofDonations: {$sum: 1}, donationAmount: {$sum:'$donations.values.' + defaultCurrency}}},
        {$sort: {_id:1}},
        {$project: {month:'$_id', _id:0, numberofDonations:1, donationAmount:1}}
      ];
  Recipient.aggregate(pipeline, function(err, totals) {
    callback(err, {totals:totals, currency:defaultCurrency});
  });
}

var getRecentDonations = function(callback) {
  var pipeline = [
        {$match:{userId: userId}},
        {$project: {donation:"$donations", "recipient":{id:"$_id", name:"$name"}}},
        {$unwind: "$donation"},
        {$sort: {"donation.dtPaid" : -1}},
        {$limit:5},
        {$project: {_id:0,donation:1,recipient:1}}
      ];
  Recipient.aggregate(pipeline, function(err, donations) {
    callback(err, donations);
  });
}

var getTopDonations = function(callback) {
  var sort = JSON.parse('{"donation.values.' + defaultCurrency + '":-1}'),
      pipeline = [
        {$match:{userId: userId}},
        {$project: {donation:"$donations", "recipient":{id:"$_id", name:"$name"}}},
        {$unwind: "$donation"},
        {$sort: sort},
        {$limit:5},
        {$project: {_id:0,donation:1,recipient:1}}
      ];
  Recipient.aggregate(pipeline, function(err, donations) {
    callback(err, {donations:donations, currency: defaultCurrency});
  });
}

var getTopRecipients = function(callback) {
  var pipeline = [
        {$match:{userId: userId}},
        {$unwind:'$donations'},
        {$group:{_id:'$_id', totalAmount:{$sum:'$donations.values.' + defaultCurrency}, name:{$first: "$name"}}},
        {$project:{totalAmount:1, name:1}},
        {$sort: {totalAmount: -1}},
        {$limit:5}
      ]; 
  Recipient.aggregate(pipeline, function(err, recipients) {
    callback(err, {recipients:recipients, currency: defaultCurrency});
  });
}


module.exports = {
  getTotals: function(req, res) {
    defaultCurrency = req.params.currency || defaultCurrency;
    defaultCurrency = defaultCurrency.toUpperCase();
    userId = mongoose.Types.ObjectId(req.decoded.user._id);
    async.parallel({
      countRecipients: getRecipientCount,
      countDonations: getDonationsCount,
      donationsPerCurrency: getDonationsPerCurrency,
      totalAmount: getTotalAmount,
      totalAmountThisYear: getTotalAmountThisYear,
      totalAmountLastYear: getTotalAmountLastYear
    }, function(err, totals) {
      response.handleError(err, res, 500, 'Error fetching totals', function(){
        response.handleSuccess(res, totals, 200, 'Received totals');
      });
    })
  },
  getLists: function(req, res) {
    defaultCurrency = req.params.currency || defaultCurrency;
    defaultCurrency = defaultCurrency.toUpperCase();
    userId = mongoose.Types.ObjectId(req.decoded.user._id);
    async.parallel({
      topDonations: getTopDonations,
      recentDonations: getRecentDonations,
      topRecipients: getTopRecipients
    }, function(err, lists) {
      response.handleError(err, res, 500, 'Error fetching lists', function(){
        response.handleSuccess(res, lists, 200, 'Received lists');
      });
    })
  },
  getCharts: function(req, res) {
    defaultCurrency = req.params.currency || defaultCurrency;
    defaultCurrency = defaultCurrency.toUpperCase();
    userId = mongoose.Types.ObjectId(req.decoded.user._id);
    async.parallel({
      totalPerMonth: getTotalPerMonth
    }, function(err, data) {
      response.handleError(err, res, 500, 'Error fetching chart data', function(){
        response.handleSuccess(res, data, 200, 'Received chart data');
      });
    })
  }
}
