const Booking = require("../models/bookingModel");

exports.getAllBookings = async (req, res) => {
  const bookings = await Booking.getAllBookings();
  res.json(bookings);
};

exports.getBookingById = async (req, res) => {
  const booking = await Booking.getBookingById(req.params.id);
  booking ? res.json(booking) : res.status(404).json({ error: "Not found" });
};

exports.createBooking = async (req, res) => {
  const newBooking = await Booking.createBooking(req.body);
  res.status(201).json(newBooking);
};

exports.updateBooking = async (req, res) => {
  const updatedBooking = await Booking.updateBooking(req.params.id, req.body);
  res.json(updatedBooking);
};

exports.deleteBooking = async (req, res) => {
  await Booking.deleteBooking(req.params.id);
  res.status(204).send();
};
