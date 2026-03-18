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
  },
  notifyBooking: async (req, res, next) => {
    const { customer_name, service, booking_time, practitioner } = req.body;
    try {
      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: NOTIFICATION_EMAIL,
        subject: `New Booking: ${service}`,
        html: `<h2>New Booking Created</h2>
          <p><strong>Customer:</strong> ${customer_name}</p>
          <p><strong>Service:</strong> ${service}</p>
          <p><strong>Time:</strong> ${new Date(booking_time).toLocaleString()}</p>
          <p><strong>Practitioner:</strong> ${practitioner || "Not assigned"}</p>`,
      });
      res.status(200).json({ success: true });
    } catch (err) {
      console.error("Email failed:", err);
      res.status(500).json({ error: "Failed to send notification" });
    }
  }
}
