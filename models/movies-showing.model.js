const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const { Timestamp } = require('mongodb');

const MovieShowingSchema = new Schema({
  cinemaId: {type: mongoose.Schema.Types.ObjectId, ref:"Cinema"},
  movieId: {type: mongoose.Schema.Types.ObjectId, ref:"Movie"},
  dateShowing: {type:Date, required:true},
  startTime: {type: String, required: true},
  endTime: {type: String, required: true},
  roomId: {type: mongoose.Schema.Types.ObjectId, ref:"Room"},

}, {timestamps: true});


module.exports = mongoose.model('MovieShowing', MovieShowingSchema);
