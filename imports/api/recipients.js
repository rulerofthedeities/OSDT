import { Mongo } from 'meteor/mongo';

export const Recipients = new Mongo.Collection('recipients');

Recipients.schema = new SimpleSchema({
  	name: {type: String},
  	category: {
  		type: String, 
		optional: true
  	},
  	createdAt: {
  		type: Date,   
  		defaultValue: new Date(),
	},
});

Recipients.attachSchema(Recipients.schema);
