// Import the 'express' module for creating a web server
const express = require('express');

// Create an instance of the Express application
const app = express();

// Define the port on which the server will listen, using environment variable or default to 3000
const PORT = process.env.PORT || 3000;

// Serve static files from the '../client/dist' directory
app.use(express.static('../client/dist'));

// Parse URL-encoded and JSON request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Import and attach the HTML routes to the Express app
require('./routes/htmlRoutes')(app);

// Start the server and listen on the specified port
app.listen(PORT, () => console.log(`Now listening on port: ${PORT}`));
