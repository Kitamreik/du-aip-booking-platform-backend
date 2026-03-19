// mongoose
// schema
const mongoose = require('mongoose');
const {Schema} = mongoose;

// call the schema
// mod exports start/schema call
const bookingSchema = new Schema ({
  name: {
      type: String,
      required: [true, 'A name is required.'],
      minlength:[1,'Minimum length for the full name is 6 characters.']
  },
  service: {
      type: String,
  },
  practitioner: {
      type: String,
  },
  dateTime: {
      type: String,
  },
  duration: {
      type: String,
  }
});

const Booking = mongoose.model('Booking', bookingSchema);

// end
module.exports = Booking;
// mod exports

// DO NOT TOUCH