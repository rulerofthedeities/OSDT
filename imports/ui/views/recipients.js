import { Recipients } from '../../api/recipients.js';
import './recipients.html';

Template.viewRecipients.helpers({

	recipients() {
		//return Donations.rawCollection().distinct("recipient.name");
		return Recipients.find({}, {sort: {'name': 1}});
	},
	editMode: function() {
		const editId = Session.get('selectedRow');
		return (this._id == editId);
	},
});

Template.viewRecipients.events({
	'click .edit-recipient': function(event){
		event.preventDefault();
		Session.set('selectedRow', this._id);
	},
	'submit .edit-form': function(event){
		event.preventDefault();
		event.stopPropagation();
		const form = event.currentTarget;
		Recipients.update({_id:this._id}, {$set:{name:form.name.value, category:form.category.value}});
		Session.set('selectedRow', null);
		return false;
	},
});
