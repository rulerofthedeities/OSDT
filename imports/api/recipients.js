import { Mongo } from 'meteor/mongo';

export const Recipients = new Mongo.Collection('recipients');

Recipients.schema = new SimpleSchema({
  	name: {
  		type: String,
  		label: "Name"
  	},
  	category: {
  		type: String,
  		label: "Category", 
		optional: true
  	},
  	createdAt: {
  		type: Date,   
  		defaultValue: new Date(),
	},
});

Recipients.attachSchema(Recipients.schema);
