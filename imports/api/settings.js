import { Mongo } from 'meteor/mongo';

export const Settings = new Mongo.Collection('settings');

Settings.schema = new SimpleSchema({
  currency: {
    type: String,
    label: 'Default Currency',
    allowedValues: ['EUR', 'USD'],
  },
  exchange_rate: {
    type: Number,
    min: 0,
    label: 'Exchange Rate',
  },
  createdAt: {
    type: Date,
    defaultValue: new Date(),
    denyUpdate: true,
  },
});

Settings.attachSchema(Settings.schema);
