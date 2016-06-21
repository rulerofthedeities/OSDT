import {Recipients} from '../../api/recipients.js';
import './recipient-form.html';

Template.formRecipient.events({
  'submit .new-recipient'(event) {
    event.preventDefault();
    const target = event.target;

    const newRecipient = {
      name: target.recipientName.value,
      category: target.category.value,
    };

    Meteor.call('recipient.insert', newRecipient, (error) => {
      if (!error) {
        target.recipientName.value = '';
        target.category.value = '';
      }
    });
  },
});

Template.formRecipient.helpers({
  errormessage: (key) => {
    const validationContext = Recipients.simpleSchema().namedContext();
    const msg = validationContext.keyErrorMessage(key);
      Session.set('errormessages', msg);
    return msg;
  },
});

