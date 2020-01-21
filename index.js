const express = require('express');
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require('./config/keys');
const bodyParser = require('body-parser');

// Generate a application that runs express
const app = express();

// Connect to MongoDB
mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

// Setup passport
require('./services/passport')

// Use middleware to preprocess incoming requests before they are sent to route handlers
app.use(bodyParser.json());
app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    keys:[keys.cookieKey] // can provide multiple keys and cookieSession will randomly pick a key to use
}));
app.use(passport.initialize());
app.use(passport.session());

// Set up route handling
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
if (process.env.NODE_ENV === 'production') {
  // Express will serve files like main.css main.js
  app.use(express.static('client/build'));

  // Express will serve index.html file if it doesnt recognise path
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Express tells node to listen for requests at PORT
const PORT = process.env.PORT || 5000; // looks for underlying environment for the port that heroku assigned || goes to port 5000
app.listen(PORT, () => {
  console.log('Server is now running on port 5000...');
});