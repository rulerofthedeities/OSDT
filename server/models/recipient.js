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

var updateSchema = new Schema(
  {
    action: String,
    user: String,
    dt: Date
  },
  { _id : false }
);

var recipientSchema = new Schema(
  { 
    userId: {type: Schema.Types.ObjectId, required: true},
    name: {type: String, required: true},
    description: {type: String, required: false},
    categories: [String],
    isActive: Boolean,
    donations: [donationSchema],
    updateLog: [updateSchema]
    //reminders: [{type: Schema.Types.ObjectId, ref: 'Reminder'}]
  },
  {
    collection: 'recipients'
  }
);

recipientSchema.index({userId: 1, name: 1}, {unique: true});
recipientSchema.index({userId: 1, isActive: 1, name: 1});

module.exports = mongoose.model('Recipient', recipientSchema);
