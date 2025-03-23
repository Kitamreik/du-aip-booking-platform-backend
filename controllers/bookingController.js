const express = require('express');
const Booking = require("../models/bookingModel");

module.exports = {
  getAllBookings: async (req, res, next) => {
    const bookings = await Booking.getAllBookings();
    res.json(bookings);
  },
  getBookingById: async (req, res, next) => {
    const booking = await Booking.getBookingById(req.params.id);
    booking ? res.json(booking) : res.status(404).json({ error: "Not found" });
  },
  createBooking: async (req, res, next) => {
    const newBooking = await Booking.createBooking(req.body);
    res.status(201).json(newBooking);
  },
  updateBooking: async (req, res, next) => {
    const updatedBooking = await Booking.updateBooking(req.params.id, req.body);
    res.json(updatedBooking);
  },
  deleteBooking: async (req, res, next) => {
    await Booking.deleteBooking(req.params.id);
    res.status(204).send();
    res.json("Entry deleted")
  }

}
