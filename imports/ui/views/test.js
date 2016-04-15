import { Recipients } from '../../api/recipients.js';
import './test.html';

Template.test.helpers({

  recipients() {
    //return Donations.rawCollection().distinct("recipient.name");
    return Recipients.find({}, {sort: {'name': 1}});
  },
	editMode: function() {
		const editId = Session.get('selectedRowTest');
		return (this._id == editId);
	},
	sel: function(){
		return Session.get('selectedRowTest');
	}
});

Template.test.events({
	'click .edit': function(event){
		event.preventDefault();
		Session.set('selectedRowTest', this._id);
	},
	'submit .edit-form': function(event){
		event.preventDefault();
		event.stopPropagation();
		const form = event.currentTarget;
		Recipients.update({_id:this._id}, {$set:{name:form.name.value, category:form.category.value}});
		Session.set('selectedRowTest', "");
		console.log(Session.get('selectedRowTest'));
		return false;
	},
});