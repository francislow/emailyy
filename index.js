const express = require('express');
const authRoutes = require('./routes/authRoutes')
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require('./config/keys');

// Generate a application that runs express
const app = express();

// Connect to MongoDB
mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

require('./services/passport')

// Middleware preprocess of the incoming request before they are sent to route handlers
app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    keys:[keys.cookieKey] // can provide multiple keys and cookieSession will randomly pick a key to use
}));

app.use(passport.initialize());
app.use(passport.session());

// app.use(authRoutes);
require('./routes/authRoutes')(app);

// Express tells node to listen for requests at PORT
const PORT = process.env.PORT || 5000; // looks for underlying environment for the port that heroku assigned || goes to port 5000
app.listen(PORT, () => {
  console.log('Server is now running on port 5000...');
});