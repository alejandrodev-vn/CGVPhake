const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
const mongoose_fuzzy_searching = require('mongoose-fuzzy-searching');
const { Timestamp } = require('mongodb');

const MovieSchema = new Schema({
  title: {type: String, required: true},
  actors: {type: String, required: true},
  directors: {type: String, required: true},
  premiere: {type: Date},
  time: {type: String, required: true},
  description: {type: String},
  imageUrl: {type: String, required: true},
  showhide: {type: Boolean, default: 1},
  ageAllowed: {type: String, required: true},
  categories: {type: Array, required: true},
  languages: {type: String, required: true},
  slug: {type: String, slug: "title",unique: true}

}, {timestamps: true});
// a setter
MovieSchema.path('title').set(function (input) {
  return input[0].toUpperCase() + input.slice(1)
});

MovieSchema.plugin(slug);
MovieSchema.plugin(mongoose_fuzzy_searching, { fields: ['title'] });

module.exports = mongoose.model('Movie', MovieSchema);
