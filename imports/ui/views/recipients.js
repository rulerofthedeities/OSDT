import { Recipients } from '../../api/recipients.js';
import './recipients.html';

Template.viewRecipients.helpers({

  recipients() {
    //return Donations.rawCollection().distinct("recipient.name");
    return Recipients.find({}, {sort: {'name': 1}});
  },

});
