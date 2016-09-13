var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema(
  { 
    disclaimer: {type: String},
    license: {type: String},
    timestamp: {type: Number, required: true, unique: true},
    dt: {type: Date, required: true},
    base: {type: String, required: true},
    rates: {type: Object, required: true}
  },
  {
    collection: 'exchangerates'
  }
);

module.exports = mongoose.model('ExchangeRate', schema);
