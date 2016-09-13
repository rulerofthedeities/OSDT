'use strict';
var CronJob = require('cron').CronJob,
    Exchange = require('../models/exchange');

function scheduleExchangeRates() {
  var daily = '00 35 11 * * *';
  var hourly = '00 35 * * * *';
  var everyminute = '0 * * * * *';
  var job = new CronJob(hourly, function() {
      loadExchangeRates();
      saveExchangeRates(rates);
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
  })
}

function saveExchangeRates(rates) {
  delete rates.disclaimer;
  delete rates.license;
  rates.dt = new Date(rates.timestamp * 1000);
  var exchangeRates = new Exchange(rates);
  exchangeRates.save(function(err, result) {
    if (err) {
      console.log('Error saving exchange rates', err);
    }
  });
}

module.exports = {
  scheduleRates: function() {
    scheduleExchangeRates();
  }
}
