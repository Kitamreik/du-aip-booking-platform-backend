const express = require('express');
const Booking = require("../models/bookingModel");

module.exports = {
  getAllBookings: async (req, res, next) => {
    const bookings = await Booking.getAllBookings();
    console.log(bookings)
    res.json("This is where all users can read entries");
  },
  getBookingById: async (req, res, next) => {
    const booking = await Booking.getBookingById(req.params.id);
    console.log(booking)
    booking ? res.json(booking) : res.status(404).json({ error: "Not found" });
  },
  createBooking: async (req, res, next) => {
    const newBooking = await Booking.createBooking(req.body);
    console.log(newBooking)
    res.status(201).json(newBooking);
  },
  updateBooking: async (req, res, next) => {
    const updatedBooking = await Booking.updateBooking(req.params.id, req.body);
    console.log(updatedBooking);
    res.json("Updated entry");
  },
  deleteBooking: async (req, res, next) => {
    await Booking.deleteBooking(req.params.id);
    res.status(204).send();
    res.json("Entry deleted")
  }

}
