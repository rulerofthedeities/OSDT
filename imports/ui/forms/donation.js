import {Donations} from '../../api/donations.js';
import {Recipients} from '../../api/recipients.js';
import './donation.html';

Template.formDonation.events({
  'submit .new-donation'(event) {
    event.preventDefault();
    const target = event.target;
    let recipient = target.recipient.value;
    const recipientDoc = Recipients.findOne({name:{$regex:'^'+ recipient + '$', $options:'i'}});
    //Check if recipient exists;
    if (recipientDoc){
      //get recipient name from db (correct case)
      recipient = recipientDoc.name;
    } else {
      //insert recipient if it doesn't exist yet
      Recipients.insert({name:recipient, createdAt: new Date()});
    }

    Donations.insert({
      recipient: {name: recipient},
      createdAt: new Date(),
    });
    target.recipient.value = '';

  },
});

Template.formDonation.helpers({

  recipients() {
    return Recipients.find({}, {sort: {'name': 1}});
  },

});