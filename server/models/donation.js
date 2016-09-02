var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Currency = require("./curency");

var schema = new Schema(
  { 
    amount: {type: Number, required: true},
    name: {type: String, required: true, index: {unique: true}},
    dtPaid: {type: Date, required: true},
    currency: {type: String, required: true}
  },
  {
    collection: 'recipients'
  }
);

module.exports = mongoose.model('Donation', schema);
