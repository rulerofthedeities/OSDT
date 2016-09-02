var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var donationSchema = new Schema(
  { 
    amount: {type: Number, required: true},
    name: {type: String, required: true, index: {unique: true}},
    dtPaid: {type: Date, required: true},
    currency: {type: String, required: true}
  }
);

var recipientSchema = new Schema(
  { 
    userId: {type: String, required: true},
    name: {type: String, required: true, index: {unique: true}},
    description: {type: String, required: false},
    categories: [String],
    donations: [donationSchema]
    //reminders: [{type: Schema.Types.ObjectId, ref: 'Reminder'}]
  },
  {
    collection: 'recipients'
  }
);

module.exports = mongoose.model('Recipient', recipientSchema);
