const express = require('express');
const passport = require('passport');
const bookingData = require("../data/booking-data");
const Booking = require("../models/bookingModel");

module.exports = {
  getAllBookings: async (req, res, next) => {
    const {name, service, practitioner, dateTime, duration} = req.body;
    const newBooking = new Booking ({
      name: name,
      service: service,
      practitioner: practitioner,
      dateTime: dateTime,
      duration: duration
    });
    newBooking.save();

    const bookings = await Booking.find({}, (error, bookingArray) => {
          if(error){
            return error;
          } else {
            res.json({
              bookingArray: bookingArray
            });
          }
        });
    res.json(bookings);
  },
  getBookingById: async (req, res, next) => {
    const booking = await Booking.findOne(req.params.id);
    booking ? res.json(booking) : res.status(404).json({ error: "Not found" });
  },
  createBooking: async (req, res, next) => {
    const {name, service, practitioner, dateTime, duration} = req.body;
    const newBooking = new Booking ({
      name: name,
      service: service,
      practitioner: practitioner,
      dateTime: dateTime,
      duration: duration
    });
    newBooking.save();

    const createBooking = await Booking.newBooking(req.body);
    res.status(201).json(createBooking);
  },
  updateBooking: async (req, res, next) => {
    const {name, service, practitioner, dateTime, duration} = req.body;
    // const updatedBooking = await Booking.updateBooking(req.params.id, req.body);
    const updatedBooking = await Booking.findByIdAndUpdate(_id, {$set: {
            name: name,
            service: service,
            practitioner: practitioner,
            dateTime: dateTime,
            duration: duration
          }}, {new: true}, error => {
            if(error) {
              return error;
            } else {
              // 
              response.json('Submission successful');
            }
          })    
    res.json(updatedBooking);
  },
  deleteBooking: async (req, res, next) => {
    await Booking.deleteBooking(req.params.id);
    res.status(204).send();
    res.json("Entry deleted");
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
