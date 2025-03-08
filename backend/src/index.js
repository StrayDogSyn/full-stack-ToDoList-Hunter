const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const todoRoutes = require('./routes/todoRoutes');

// API Routes
app.use('/api/v1/todos', todoRoutes);

// Base route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the ToDo List API' });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
