const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const { Timestamp } = require('mongodb');

const UserSchema = new Schema({
  fullname: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  birthday: {type: String, required: true},
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  phoneNumber: {type: String, required: true},
  city: {type: String, required: true},
  favourite: {type: String, required: true},
  sex: {type: String, required: true},
  role: {type: String, default:0}

}, {timestamps: true});
// a setter
UserSchema.path('fullname').set(function (input) {
  return input.charAt(0).toUpperCase() + input.slice(1);
});

module.exports = mongoose.model('User', UserSchema);
