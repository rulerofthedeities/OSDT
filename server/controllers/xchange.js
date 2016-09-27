'use strict';
var mongoose = require('mongoose'),
    response = require("../response"),
    Exchange = require('../models/exchange'),
    CronJob = require('cron').CronJob,
    request = require("request");

function scheduleExchangeRates() {
  var daily = '00 15 00 * * *';
  var hourly = '00 55 * * * *';
  var job = new CronJob(daily, function() {
      loadExchangeRates();
    }, function () {
      /* This function is executed when the job stops */
    },
    false, /* Start the job right now */
    'Europe/Prague' /* Time zone of this job. */
  );
  job.start();
}

function loadExchangeRates() {
  console.log('Fetching exchange rates', new Date());
  var api_key = process.env.OPENEXCHANGERATES_API;
  if (api_key) {
    var url = "https://openexchangerates.org/api/latest.json?app_id=" + api_key;
    request({
      url: url,
      json: true
    }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
          saveExchangeRates(body);
        } else {
          console.log('error retrieving exchange rates', error);
        }
    });
  } else {
    console.log('Error: no api key for openexchangerates found');
  }
}

function saveExchangeRates(rates) {
  delete rates.disclaimer;
  delete rates.license;
  rates.dt = new Date(rates.timestamp * 1000);
  var exchangeRates = new Exchange(rates);
  exchangeRates.save(function(err, result) {
    if (err) {
      console.log('Error saving exchange rates', rates, err);
    }
  });
}

module.exports = {
  scheduleRates: function() {
    scheduleExchangeRates();
  },
  getExchangeRate: function(req, res) {
    var timestamp = req.params.time,
        currencies = req.body.currencies,
        projection = {_id:0};

    if (!currencies || !timestamp) {
      response.handleError({message:'Invalid timestamp or currencies'}, res, 500, 'Error loading exchange rates', function(){});
    }
    currencies.forEach(function(currency) {projection['rates.'+ currency] = 1})
    Exchange
      .find({timestamp:{$lte:timestamp}}, projection)
      .sort({timestamp:-1}).limit(1)
      .exec(function(err, rates) {
        response.handleError(err, res, 500, 'Error loading exchange rates', function(){
          response.handleSuccess(res, rates, 200, 'Loaded exchange rates');
        });
      });
  }
}
