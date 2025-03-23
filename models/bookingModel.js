const knex = require("knex")(require("../knexfile").development);

//knex("bookings").select("*") fetches all bookings.
const getAllBookings = () => knex("bookings").select("*");

//where({ id }).first() ensures we fetch a single booking.
const getBookingById = (id) => knex("bookings").where({ id }).first();

//insert(data).returning("*") adds a new booking and returns the inserted row.
const createBooking = (data) => knex("bookings").insert(data).returning("*");

//update(data).returning("*") modifies a booking and returns the updated row.
const updateBooking = (id, data) => knex("bookings").where({ id }).update(data).returning("*");

//where({ id }).del() deletes a booking.
const deleteBooking = (id) => knex("bookings").where({ id }).del();

module.exports = { getAllBookings, getBookingById, createBooking, updateBooking, deleteBooking };
