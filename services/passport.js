const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
const keys = require('../config/keys');
const User = require('../models/User');

// Serialise user = change user object into a unique id (mongo id) then continue (done)
// The purpose of this method is to let passport serialise a specified user given the specified user
passport.serializeUser((user, done) => {
  console.log('Serialised user. Id is', user.id);
  done(null, user.id); // note this user.id is the mongoDB _id
});

// Deserialise user = change id back into user object then continue (done)
// The purpose of this method is let passport deserialise the specified user given the specified user id
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    console.log('Deserialised user. User object is', user);
    done(null, user);
  });
});

// Passport to make use of google strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback', // this needs to be authorised in the google dev console
      proxy: true
    },
    // Call back function after receiving trading code for user information
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleID: profile.id }).then(existingUser => {
        if (existingUser) {
          // Already have records of the user
          done(null, existingUser); // done tells passport that we are done with creating user, and move on to serializing user
        } else {
          // No records of user found, create a new one
          new User({ googleID: profile.id })
            .save()
            .then(user => done(null, user));
        }
      });
      // At this point, after user signed in already, we do not care about the google id anymore.
      // Instead we use the mongoDB _id to retrieve data
    }
  )
);
