// Import the 'path' module to work with file paths
const path = require('path');

// Export a function that takes an 'app' parameter (Express app) to define a route
module.exports = (app) =>
  // Handle GET requests to the root URL ('/')
  app.get('/', (req, res) =>
    // Send the 'index.html' file located in the 'dist' directory of the client
    res.sendFile(path.join(__dirname, '../client/dist/index.html'))
  );
