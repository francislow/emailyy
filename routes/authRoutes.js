const passport = require('passport');

module.exports = app => {
  // Passport will redirect to google for authentication
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  // After user authenticate, google will supply a code and redirect user to callback route after authentication
  app.get(
    '/auth/google/callback',
    // Passport to receive the code and trade for user information (ie access token, profile ...)
    passport.authenticate('google')
  );

  app.get('/api/logout', (req, res) => {
    req.logout(); // kills the cookie that contain id
    res.send(req.user);
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.session); // passport automatically attaches user/ logout to req for us to use
  });
};
