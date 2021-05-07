const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  title: {type: String, required: true},
  value: {type: String, required: true, unique:true}
});
// a setter
CategorySchema.path('title').set(function (input) {
  return input[0].toUpperCase() + input.slice(1)
});

module.exports = mongoose.model('Category', CategorySchema);
