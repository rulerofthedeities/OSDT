var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema(
  { 
    name: {type: String, required: true},
    code: {type: String, required: true},
    symbol: {type: String, required: true},
    isDefault: {type: Boolean, default: false}
  }, 
  {
    collection: 'currencies'
  }
);

module.exports = mongoose.model('Currency', schema);
