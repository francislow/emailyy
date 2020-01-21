// This is done to fix development environment only. (there are 2 servers running)
// In the heroku deloyment, there is only one server which is heroku so
// the problem of getting redirected to localhost:3000/auth/google does not exist

const proxy = require('http-proxy-middleware')
 
module.exports = function(app) {
    app.use(proxy(['/api', '/auth/google'], { target: 'http://localhost:5000' }));
}