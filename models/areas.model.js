const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const { Timestamp } = require('mongodb');
var slug = require('mongoose-slug-generator');

const AreaChema = new Schema({
  nameArea: {type: String, required: true},
  slug: {type: String, slug: "nameArea",unique: true}
}, {timestamps: true});
// a setter
AreaChema.path('nameArea').set(function (input) {
  return input[0].toUpperCase() + input.slice(1)
});

AreaChema.plugin(slug);

module.exports = mongoose.model('Area', AreaChema);
