import { Meteor } from 'meteor/meteor';
import { Recipients } from '../recipients.js';
import { Donations } from '../donations.js';

Meteor.publish('recipients', function recipientsPublication() {
  return Recipients.find({}, {sort: {'name': 1}});
});

Meteor.publish('donations', function donationsPublication() {
  return Donations.find({});
});

