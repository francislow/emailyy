const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

// Serialise user = change user object into a unique id (mongo id) then continue (done)
// The purpose of this method is to let passport serialise a specified user given the specified user
// Serialize user into id and store it as cookie
passport.serializeUser((user, done) => {
  console.log('serialized USER')
  done(null, user.id); // note this user.id is the mongoDB _id
});

// Deserialise user = change id back into user object then continue (done)
// The purpose of this method is let passport deserialise the specified user given the specified user id
// Deerialize user id from cookie to retrieve whole user object, fetch user object is attached to req.user
passport.deserializeUser((id, done) => {
  console.log('deserialized USER')
  User.findById(id).then(user => {
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
    // Call back function after receiving trading the unique code for user information
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleID: profile.id });
    
      // Store first-time users to database
      if (existingUser) {
        done(null, existingUser);
      } else {
        const newUser = await new User({ googleID: profile.id }).save()
        done(null, newUser);
      }
      // At this point, after user signed in already, we do not care about the google id anymore.
      // Instead we use the mongoDB _id to retrieve data
    }
  )
);
