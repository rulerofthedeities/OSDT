import { Template } from 'meteor/templating';
import { Donations } from '../../api/donations.js';
import './transactions.html';

Template.viewTransactions.helpers({

  donations() {
    return Donations.find({}, {sort: {'recipient.name': 1}});
  },

});
