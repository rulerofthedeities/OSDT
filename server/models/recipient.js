var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var donationSchema = new Schema(
  { 
    currency: {type: String, required: true},
    amount: {type: Number, required: true},
    paymentType: String,
    dtPaid: {type: Date, required: true},
    note: String,
    rates: Object,
    values: Object
  }
);

var recipientSchema = new Schema(
  { 
    userId: {type: Schema.Types.ObjectId, required: true},
    name: {type: String, required: true, index: {unique: true}},
    description: {type: String, required: false},
    categories: [String],
    isActive: Boolean,
    donations: [donationSchema]
    //reminders: [{type: Schema.Types.ObjectId, ref: 'Reminder'}]
  },
  {
    collection: 'recipients'
  }
);

module.exports = mongoose.model('Recipient', recipientSchema);
