const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const { Timestamp } = require('mongodb');

const RoomSchema = new Schema({
  nameRoom: {type: String, required: true},
  cinemaId: {type: mongoose.Schema.Types.ObjectId, ref:"Cinema"},
  seats: {type:Array, required: true}
}, {timestamps: true});
// a setter
RoomSchema.path('nameRoom').set(function (input) {
  return input[0].toUpperCase() + input.slice(1)
});

module.exports = mongoose.model('Room', RoomSchema);
