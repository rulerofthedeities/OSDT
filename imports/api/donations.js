import { Mongo } from 'meteor/mongo';

export const Donations = new Mongo.Collection('donations');

Donations.schema = new SimpleSchema({
  recipient: {
    type: String,
    label: 'Recipient',
  },
  amount: {
    type: Number,
    min: 1,
    label: 'Amount',
  },
  currency: {
    type: String,
    label: 'Currency',
    allowedValues: ['EUR', 'USD'],
  },
  dt: {
    type: String,
    label: 'Date',
    //regEx: /^[0-9]{5}$/
    regEx: /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/
  },
  paymentType: {
    type: String,
    label: 'Payment Type',
    optional: true,
  },
  exchangeRate: {
    type: Number,
    optional: true,
  },
  createdAt: {
    type: Date,
    defaultValue: new Date(),
    denyUpdate: true,
  },
  updatedAt: {
    type: Date,
    autoValue: function() {
      if (this.isUpdate) {
        return new Date();
      }
    },
    denyInsert: true,
    optional: true
  },
});

Donations.attachSchema(Donations.schema);
