import {Donations} from '../../api/donations.js';
import {Recipients} from '../../api/recipients.js';
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
  errormessage: function(key){
    const validationContext = Donations.simpleSchema().namedContext();
    const msg = validationContext.keyErrorMessage(key);
    if (!Session.get('errormessages')){
      Session.set('errormessages', msg);
    }
    return msg;
  },
  firsterrormessage: function(){
    const validationContext = Donations.simpleSchema().namedContext();
    return Session.get('errormessages');
  },

});

Template.formDonation.events({
  'submit .new-donation'(event) {
    event.preventDefault();
    const target = event.target;
    let recipient = target.recipient.value;
    let amount = target.amount.value;
    let currency = target.currency.value;
    let dt = target.dt.value;
    let paymentType = target.dt.paymentType;
    let exchangeRate = target.dt.exchangeRate;

    recipient = addRecipient(recipient);
    let newDonation = {
      recipient,
      amount,
      currency,
      dt,
      paymentType,
      exchangeRate,
      createdAt: new Date(),
    };

    Donations.insert(newDonation, (error, result) => {
      if (error){
        //console.log(error.message);
      } else {
        target.recipient.value = '';
        target.amount.value = '';
        target.currency.value = '';
        target.dt.value = '';
        target.paymentType.value = '';
        target.exchangeRate.value = '';
      }
    });
  },
});

function addRecipient(recipient){
  const recipientDoc = Recipients.findOne(
    {name: {$regex: '^' + recipient + '$', $options: 'i'}}
  );
  //Check if recipient exists;
  if (recipientDoc){
    //get recipient name from db (correct case)
    return recipientDoc.name;
  } else if (recipient.trim().length > 0) {
    //insert recipient if it doesn't exist yet
    Recipients.insert({name:recipient, createdAt: new Date()});
    return recipient;
  }
}
