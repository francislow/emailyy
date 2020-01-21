const passport = require('passport');

module.exports = app => {
  // Passport will redirect to google for authentication
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  // After user authenticate, google will redirect user to callback route after authentication and supply a unique code
  app.get(
    '/auth/google/callback',
    // Passport to receive the code and trade for user information (ie access token, profile ...)
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/surveys');
    }
  );

  app.get('/api/logout', (req, res) => {
    req.logout(); // kills the cookie that contain id
    res.redirect('/');
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user); // passport automatically attaches user/logout to req for us to use
  });
};
