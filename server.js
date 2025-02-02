import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import winston from "winston";

// Load environment variables from a .env file into process.env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000; // Default to 5000 if PORT isn't set
if (!PORT || isNaN(PORT)) {
  console.error("Invalid or missing PORT environment variable");
  process.exit(1);
}

// Middleware
// Enable Cross-Origin Resource Sharing (CORS) for all routes
app.use(cors());
// Middleware to parse JSON bodies
app.use(express.json());

// MongoDB connection
const MONGODB_URI = process.env.MONGO_URI; // Make sure to match the variable name in the .env file
if (!MONGODB_URI) {
  console.error("Missing MONGO_URI environment variable");
  process.exit(1);
}

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => winston.error("MongoDB connection error:", err));

// Response message
const HELLO_WORLD_MESSAGE = "Hello, World!";

// Simple route
app.get("/", (req, res) => {
  res.send(HELLO_WORLD_MESSAGE);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
// Import the Task model at the top of the server.js file
import Task from './models/task.model.js';

// Example POST route to add a task
app.post('/tasks', async (req, res) => {
  try {
    const { title, description } = req.body;

    // Create a new task using the Task model
    const newTask = new Task({
      title,
      description,
    });

    // Save the task to the database
    const savedTask = await newTask.save();

    res.status(201).json(savedTask); // Return the saved task as JSON
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error saving task' });
  }
});

// Example GET route to fetch all tasks
app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks); // Return the tasks as JSON
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching tasks' });
  }
});
