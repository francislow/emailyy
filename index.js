const express = require('express');

// Generate a application that runs express
const app = express();

app.get('/', (req, res) => {
  res.send('yesssssssss');
});

// Express tells node to listen for requests at PORT
const PORT = process.env.PORT || 5000; // looks for underlying environment for the port that heroku assigned || goes to port 5000
app.listen(PORT, () => {
  console.log('Server is now running on port 5000...');
});
