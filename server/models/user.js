var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    mongooseUniqueValidator = require('mongoose-unique-validator');

var settingsSchema = new Schema(
  { 
    defaultCurrency: {type: String, required: true, default: false}
  }
);

var accessSchema = new Schema(
  { 
    level: {type: Number},
    roles: {type: [String]}
  },
  { _id: false}
);

var userSchema = new Schema({
    userName: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    settings: {type: settingsSchema},
    access: {type: accessSchema}
});

userSchema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('User', userSchema);

