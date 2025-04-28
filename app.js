//Main entry point: Handles Express initialization, middleware, and API routing.
require("dotenv").config();
const express = require("express");
const { clerkMiddleware, requireAuth } = require("@clerk/express");
const app = express();
const PORT = process.env.PORT || 3001;
const cors = require("cors")

const path = require('node:path');
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine','ejs');
app.use(express.json()); 

// Clerk Middleware to check authentication - protects all routes and ensures users are authenticated before accessing them, is required to be set in the middleware chain before req.auth is used, globally
app.use(clerkMiddleware());

app.use(cors({
    origin: `${process.env.FRONT_END_VERCEL}`, //frontend, https://your-frontend.vercel.app
    credentials: true,
}));

app.use((req, res, next) => {
  console.log("Incoming request auth:", req.auth); // From Clerk
  next();
});


//Index
app.get('/', (req, res, next) => {
    //const { userId, sessionId } = req.auth;
    // const template = "development";
    // const result = clerkClient.sessions.getToken(sessionId, template)
    res.status(200).json({success: "Index operational"})
})

// Protected route: only accessible with valid Clerk session 
app.get("/auth-state", requireAuth(), (req, res, next) => {
    const { userId, sessionId } = req.auth;
  
    res.status(200).json({
      message: "You are authenticated!",
      userId,
      sessionId,
    });
  });

const bookingsRouter = require("./routes/bookings");
app.use("/api/bookings", requireAuth(), bookingsRouter); //D

//require('./config/connection');

app.listen(PORT, () => console.log(`Server running on port ${PORT}, connection established`));
