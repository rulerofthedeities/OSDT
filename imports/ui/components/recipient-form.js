import {Recipients} from '../../api/recipients.js';
import './recipient-form.html';

Template.formRecipient.events({
	'submit .new-recipient'(event){
    	event.preventDefault();
		const target = event.target;
		const name = target.recipientName.value;
		const category = target.category.value;

		const newRecipient = {
			name,
			category,
		};

		Recipients.insert(newRecipient, (error, result) => {
			if (error){
				//console.log(error.message);
			} else {
				target.recipientName.value = '';
				target.category.value = '';
			};
		});
	},
});

Template.formRecipient.helpers({
	errormessage:function(key){
		const validationContext = Recipients.simpleSchema().namedContext();
		const msg = validationContext.keyErrorMessage(key);
		if (!Session.get('errormessages')){
			Session.set('errormessages', msg);
		}
		return msg;
	},
	firsterrormessage:function(){
		const validationContext = Recipients.simpleSchema().namedContext();
		return Session.get('errormessages');
	},
})
