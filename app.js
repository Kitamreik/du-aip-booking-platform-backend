//Main entry point: Handles Express initialization, middleware, and API routing.
require("dotenv").config();
const express = require("express");
//const { createClerkClient } = require("@clerk/backend")
const { clerkMiddleware, requireAuth } = require("@clerk/express");
//const clerkClient = createClerkClient({ publishableKey: process.env.CLERK_PUBLISHABLE_KEY, apiUrl: process.env.CLERK_FRONTEND_API, secretKey: process.env.CLERK_SECRET_KEY })
const app = express();
const PORT = process.env.PORT || 3001;
const cors = require("cors")

app.use(express.json()); //{ clerkClient }
//app.use(express.json({ clerkClient }));

// Clerk Middleware to check authentication - protects all routes and ensures users are authenticated before accessing them, is required to be set in the middleware chain before req.auth is used, globally
app.use(clerkMiddleware({}));

app.use(cors({
    origin: `"http://localhost:${process.env.ORIGIN_PORT}"`, //frontend
    credentials: true,
  }));
  

//Index
app.get('/', (req, res, next) => {
    const { userId, sessionId } = req.auth;
    // const template = "development";
    // const result = clerkClient.sessions.getToken(sessionId, template)
    
    console.log("Index init");
    
    res.status(200).json({success: "Index operational"})
})

// Protected route: only accessible with valid Clerk session - TROUBLESHOOT
app.get('/auth-state', requireAuth(), (req, res) => {
    const { userId, sessionId } = req.auth;
  
    res.status(200).json({
      message: "You are authenticated!",
      userId,
      sessionId,
    });
  });

const bookingsRouter = require("./routes/bookings");
app.use("/api/bookings", requireAuth(), bookingsRouter); 

//require('./config/connection');

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
