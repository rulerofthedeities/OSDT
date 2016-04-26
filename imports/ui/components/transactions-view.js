import { Donations } from '../../api/donations.js';
import './transactions-view.html';

Template.viewTransactions.onCreated(function viewTransactionsOnCreated() {
    this.subscribe('donations');
});

Template.viewTransactions.helpers({

  donations() {
    return Donations.find({}, {sort: {'recipient.name': 1}});
  },

});
