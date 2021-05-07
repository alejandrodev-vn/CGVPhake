const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const { Timestamp } = require('mongodb');

const BookingSchema = new Schema({
  movieShowingId: {type: mongoose.Schema.Types.ObjectId, ref:"MovieShowing"},
  roomId: {type: mongoose.Schema.Types.ObjectId, ref:"Room"}
}, {timestamps: true});


module.exports = mongoose.model('Booking', BookingSchema);
