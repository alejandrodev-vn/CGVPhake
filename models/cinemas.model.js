const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
const { Timestamp } = require('mongodb');

const CinemaSchema = new Schema({
  nameCinema: {type: String, required: true},
  nameArea: {type: String, required: true},
  slug: {type: String, slug: "nameCinema",unique: true}

}, {timestamps: true});
// a setter
CinemaSchema.path('nameCinema').set(function (input) {
  return input[0].toUpperCase() + input.slice(1)
});

CinemaSchema.plugin(slug);

module.exports = mongoose.model('Cinema', CinemaSchema);
