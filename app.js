//Main entry point: Handles Express initialization, middleware, and API routing.
require("dotenv").config();
const express = require("express");const { ClerkExpressRequireAuth } = require("@clerk/clerk-sdk-node");
const app = express();
const bookingsRouter = require("./routes/bookings");

app.use(express.json());

// Clerk Middleware to check authentication - protects all routes and ensures users are authenticated before accessing them
app.use(ClerkExpressRequireAuth());

// If a request does not include a valid Clerk session, the API will return 401 Unauthorized.

app.use("/api/bookings", bookingsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
