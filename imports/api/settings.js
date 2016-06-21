import { Mongo } from 'meteor/mongo';

export const Settings = new Mongo.Collection('settings');

Settings.schema = new SimpleSchema({
  currency: {
    type: String,
    label: 'Default Currency',
    allowedValues: ['EUR', 'USD'],
  },
  exchangeRate: {
    type: Number,
    min: 0,
    decimal: true,
    label: 'Exchange Rate',
  },
  dt: {
    type: Date,
    defaultValue: new Date(),
  },
});

Settings.attachSchema(Settings.schema);


Meteor.methods({
  'settings.insert'(newSetting) {
    //check(newSetting, {currency: String, exchangeRate: Number});
    const id = Settings.insert(newSetting);
    //throw new Meteor.Error('not-authorized');
    return id;
  },
});
