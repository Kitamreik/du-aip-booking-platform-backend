const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");
// const { verifyAdmin } = require("../middleware/authMiddleware");
const nodemailer = require("nodemailer");

const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL;

const transporter = nodemailer.createTransport({
  service: "gmail", // or your preferred SMTP provider
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

router.route("/").get(bookingController.getAllBookings); // open to all logged-in users
router.route("/:id").get(bookingController.getBookingById); 
router.route("/:id").put(bookingController.getBookingById); //test 

//Email route - notification
router.route("/:notify").post(bookingController.notifyBooking);

//secure routes - verifyAdmin
router.route("/create").post(bookingController.createBooking);
router.route("/update/:id").put(bookingController.updateBooking);
router.route("/delete/:id").delete(bookingController.deleteBooking);

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