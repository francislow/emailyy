// Figure out which set of credentials to return

// Heroku automatically sets env variable of NODE_ENV to 'production'
if (process.env.NODE_ENV === 'production') {
    // We are in production, return prod keys
    module.exports = require('./prod');
} else {
    // We are in development, return dev keys
    module.exports = require('./dev');
}