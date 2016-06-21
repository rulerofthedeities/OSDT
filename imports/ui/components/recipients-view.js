import { Recipients } from '../../api/recipients.js';
import './recipients-view.html';

Template.viewRecipients.onCreated(function viewRecipientsOnCreated() {
  this.subscribe('recipients');
});

Template.viewRecipients.helpers({
  recipients() {
    return Recipients.find({}, {sort: {'name_sort': 1}});
  },
  editMode: function() {
    const editId = Session.get('selectedRow');
    return (this._id === editId);
  },
});

Template.viewRecipients.events({
  'click .edit-recipient': function(event) {
    event.preventDefault();
    Session.set('selectedRow', this._id);
  },
  'submit .edit-form': function(event) {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    const doc = {
      id: this._id,
      name: form.name.value,
      category: form.category.value,
    };
    Meteor.call('recipient.update', doc);
    Session.set('selectedRow', null);
    return false;
  },
});

