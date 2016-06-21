import {Donations} from '../../api/donations.js';
import {Recipients} from '../../api/recipients.js';
import {Settings} from '../../api/settings.js';
import './donation-form.html';

Template.formDonation.onCreated(function formDonationOnCreated() {
  //this.autorun(() => {
  this.subscribe('recipients');
  //});
});

Template.formDonation.helpers({
  recipients() {
    return Recipients.find({}, {sort: {'name_sort': 1}});
  },
  errormessage: function(key) {
    const validationContext = Donations.simpleSchema().namedContext();
    const msg = validationContext.keyErrorMessage(key);
    if (!Session.get('errormessages')) {
      Session.set('errormessages', msg);
    }
    return msg;
  },
  firsterrormessage: function() {
    const validationContext = Donations.simpleSchema().namedContext();
    return Session.get('errormessages');
  },

});

Template.formDonation.events({
  'submit .new-donation'(event) {
    event.preventDefault();
    const target = event.target;
    let recipient = target.recipient.value;

    //Check if recipient exists; if not, add new recipient
    //if recipient exists, check for case and return correct case
    addRecipient(recipient, (newRecipient) => {
      recipient = newRecipient;

      let newDonation = {
        recipient,
        amount: target.amount.value,
        currency: target.currency.value,
        dt: target.dt.value,
        paymentType: target.dt.paymentType,
        exchangeRate: target.dt.exchangeRate,
        createdAt: new Date(),
      };

      Meteor.call('donations.insert', newDonation, (error) => {
        if (!error) {
          target.recipient.value = '';
          target.amount.value = '';
        }
      });
    });
  },
});

function addRecipient(recipient, cb) {
  let inputName = recipient.trim();
  Meteor.call('recipient.getByName', inputName, (error, recipientName) => {
    if(error) {
      console.log('Error', error.message);
    } else {
      //Check if recipient exists;
      if (recipientName && recipientName.length > 0) {
        //get recipient name from db (correct case)
        cb(recipientName);
      } else if (inputName.length > 0) {
        cb(inputName);
        //insert recipient if it doesn't exist yet
        let doc = {name: inputName, createdAt: new Date()};
        Meteor.call('recipient.insert', doc);
      }
    }
  });
}
