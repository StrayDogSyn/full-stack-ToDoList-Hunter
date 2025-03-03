// backend/index.js

// Import dependencies
const express = require('express');
const cors = require('cors');

// Initialize the app
const app = express();

// Middleware
app.use(cors()); // Allows cross-origin requests
app.use(express.json()); // Parse incoming JSON requests

// Define a simple route
app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

// Start the server
const PORT = process.env.PORT || 5000; // Use environment variable or default to 5000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
