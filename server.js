import express from 'express';  // Import Express
import dotenv from 'dotenv';    // Import dotenv for environment variables

dotenv.config();  // Load environment variables from .env

// Initialize the app
const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Basic route to test the server
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Start the server
const PORT = process.env.PORT || 5000;  // Use port from env or default to 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
