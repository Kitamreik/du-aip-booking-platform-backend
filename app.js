//Main entry point: Handles Express initialization, middleware, and API routing.
require("dotenv").config();
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
const { clerkMiddleware, requireAuth } = require("@clerk/express");
const app = express();
const PORT = process.env.PORT || 3001;



const path = require('node:path');
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine','ejs');
app.use(express.json()); 


app.use(session({
    secret: process.env.SECRET_KEY, 
    resave: false, 
    saveUninitialized: false
}));

// initialize passport
app.use(passport.initialize());

// passport to use session
app.use(passport.session());

//require('./config/connection');

// Clerk Middleware to check authentication - protects all routes and ensures users are authenticated before accessing them, is required to be set in the middleware chain before req.auth is used, globally
app.use(clerkMiddleware());

const allowedOrigins = [
  `http://localhost:${process.env.REACT_PORT}`,`http://localhost:${process.env.PORT}`,
  `${process.env.FRONT_END}`
];

//Origin Verification
app.use(cors({
    origin: function (origin, logger) {
      if (!origin || allowedOrigins.includes(origin)) {
        logger(null, origin, "Origin not detected");
      } else {
        logger(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
}));

//Err handling middleware
app.use((err, req, res, next) => {
  console.log("Incoming request auth:", req.auth); // From Clerk
  next();
  console.error(err.stack);
  res.status(500).send('The server crashed, please read the logs.');
});


//Index
app.get('/', (req, res, next) => {
    const { userId, sessionId } = req.auth;
    // const template = "development";
    // const result = clerkClient.sessions.getToken(sessionId)
    res.status(200).json({success: "Index operational"});
});

app.get('/login', (req, res, next) => {
  res.status(200).json({success: "Login operational"});
});

app.post('/login', (req, res, next) => {
   const {username, password, googleId} = req.body;
     // New info
    const user = new User({
      username: username,
      password: password, 
      googleId: googleId
    });

    req.login(user, (error) => {
      if (error) {
        console.log(error)
        res.redirect('/login');
      } else {
        passport.authenticate('local')(req, res, () => {
          res.redirect('/admin');
        });
      }
    });
});

app.get('/register', (req, res, next) => {
  res.status(200).json({success: "Register operational"});
});

app.post('/register', (req, res, next) => {
   const {username, password} = req.body;
    User.register({username: username}, password, (error, user) => {
      if (error) {
        console.log(error);
        res.redirect('/register');
        // check the routes folder to check --> siteRouter --> redirect trigger --> GET
      } else {
        // if they are successful 
        passport.authenticate('local')(req, res, next, () => {
          res.redirect('/login');
          // you created your account --> login --> GET
        });
      };
    });
});

app.get('/logout', (req, res, next) => {
  req.logout(function(err) {
      // destroy the session for the user
      if (err) { return next(err); }
      // redirect back to the homepage
      res.redirect('/');
    });
});

// Google
app.get('/auth/google', (req, res, next) => {
  passport.authenticate('google', {scope: ['openid', 'profile', 'email']})
});

app.get('/auth/google/admin', (req, res, next) => {
  passport.authenticate('google', {failureRedirect: '/sign-in'}),
    function(request, response, next) {
      // Successful Authentication Authorization
      response.redirect('/admin');
    }
});

// Protected route: only accessible with valid Clerk session 
app.get("/auth-state", (req, res, next) => {
    const { userId, sessionId } = req.auth;
  
    res.status(200).json({
      message: "You are authenticated!",
      userId,
      sessionId,
    });
  });

const bookingsRouter = require("./routes/bookings");
app.use("/api/bookings", bookingsRouter); //D

app.listen(PORT, () => console.log(`Server running on port ${PORT}, connection established`));
