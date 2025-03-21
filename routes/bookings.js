const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");
const { verifyAdmin } = require("../middleware/authMiddleware");

router.get("/", bookingController.getAllBookings);
router.get("/:id", bookingController.getBookingById);

//secure routes
router.post("/", verifyAdmin, bookingController.createBooking);
router.put("/:id", verifyAdmin, bookingController.updateBooking);
router.delete("/:id", verifyAdmin,bookingController.deleteBooking);

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