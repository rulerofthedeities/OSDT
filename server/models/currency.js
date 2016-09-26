var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var currencySchema = new Schema(
  { 
    name: {type: String, required: true, index: true},
    code: {type: String, required: true},
    symbol: {type: String, required: true}
  },
  {
    collection: 'currencies'
  }
);

module.exports = mongoose.model('Currency', currencySchema);
