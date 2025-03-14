const express = require("express");
const router = express.Router();
const BookingController = require("../controllers/bookingController");

router.get("/", BookingController.getAllBookings);
router.get("/:id", BookingController.getBookingById);
router.post("/", BookingController.createBooking);
router.put("/:id", BookingController.updateBooking);
router.delete("/:id", BookingController.deleteBooking);

module.exports = router;
//Enhanced Booking Management
/*
const express = require("express");
const router = express.Router();
const Booking = require("../models/bookingModel");

router.get("/", async (req, res) => {
  const bookings = await Booking.getAllBookings();
  res.json(bookings);
});

router.get("/:id", async (req, res) => {
  const booking = await Booking.getBookingById(req.params.id);
  booking ? res.json(booking) : res.status(404).json({ error: "Not found" });
});

router.post("/", async (req, res) => {
  const newBooking = await Booking.createBooking(req.body);
  res.status(201).json(newBooking);
});

router.put("/:id", async (req, res) => {
  const updatedBooking = await Booking.updateBooking(req.params.id, req.body);
  res.json(updatedBooking);
});

router.delete("/:id", async (req, res) => {
  await Booking.deleteBooking(req.params.id);
  res.status(204).send();
});

module.exports = router;

*/