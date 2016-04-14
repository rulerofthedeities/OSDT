import {Recipients} from '../../api/recipients.js';
import './recipient.html';

Template.formRecipient.events({
	'submit .new-recipient'(event){
    	event.preventDefault();
		const target = event.target;
		const name = target.recipientName.value;
		const category = target.category.value;

		Recipients.insert({
			name,
			category,
			createdAt: new Date(),
		});
		target.recipientName.value = '';
		target.category.value = '';
	},
})