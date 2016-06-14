import { Meteor } from 'meteor/meteor';
import { Settings } from '../settings.js';
import { Recipients } from '../recipients.js';
import { Donations } from '../donations.js';

Meteor.publish('settings', function() {
  return Settings.find({}, {sort: {dt: -1}});
});

Meteor.publish('recipients', function() {
  return Recipients.find({}, {sort: {'name': 1}});
});

Meteor.publish('donations', function() {
  return Donations.find({});
});

