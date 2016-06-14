import { Mongo } from 'meteor/mongo';

export const Recipients = new Mongo.Collection('recipients');

Recipients.schema = new SimpleSchema({
  name: {
    type: String,
    label: 'Name',
  },
  name_sort: {
    type: String,
    optional: true,
    autoValue: function() {
      let name = this.field('name');
      if (name.isSet) {
        return name.value.toLowerCase();
      } else {
        this.unset();
      }
    },
  },
  category: {
    type: String,
    label: 'Category',
    optional: true,
  },
  createdAt: {
    type: Date,
    defaultValue: new Date(),
    denyUpdate: true,
  },
});

Recipients.attachSchema(Recipients.schema);
