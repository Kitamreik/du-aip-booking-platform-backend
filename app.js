//Main entry point: Handles Express initialization, middleware, and API routing.
require("dotenv").config();
const express = require("express");
const app = express();
const bookingsRouter = require("./routes/bookings");

app.use(express.json());
app.use("/api/bookings", bookingsRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
