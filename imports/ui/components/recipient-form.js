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
				console.log(error.invalidKeys);
				
				// = Recipients.simpleSchema().namedContext().invalidKeys()
			} else {
				console.log("validation ok");
			};
		});
		target.recipientName.value = '';
		target.category.value = '';
	},
});
