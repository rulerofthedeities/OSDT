var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema(
  { 
    userId: {type: String, required: true},
    name: {type: String, required: true, index: {unique: true}},
    description: {type: String, required: false},
    categories: [String]
    //donations: [{type: Schema.Types.ObjectId, ref: 'Donation'}],
    //reminders: [{type: Schema.Types.ObjectId, ref: 'Reminder'}]
  },
  {
    collection: 'recipients'
  }
);

module.exports = mongoose.model('Recipient', schema);
