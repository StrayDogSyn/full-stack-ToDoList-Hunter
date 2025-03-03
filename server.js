import express from 'express';
import mongoose from 'mongoose';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import Task from './models/task.model.js'; // Import the correct Task model

const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON request bodies

// Route to get all tasks
app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find(); // Fetch tasks from MongoDB
    res.json(tasks); // Send them as a JSON response
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to create a new task
app.post('/tasks', async (req, res) => {
  const { title, description } = req.body; // Use title and description
  const newTask = new Task({ title, description, completed: false });

  try {
    const savedTask = await newTask.save(); // Save the task to the database
    res.status(201).json(savedTask); // Return the saved task as a JSON response
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(400).json({ error: 'Bad Request' });
  }
});

// Route to update a task's completion status
app.put('/tasks/:id', async (req, res) => {
  const { id } = req.params; // Get task ID from the URL
  const { completed } = req.body; // Get the new completion status from the request body

  try {
    const updatedTask = await Task.findByIdAndUpdate(id, { completed }, { new: true });
    if (!updatedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(updatedTask); // Return the updated task as a JSON response
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(400).json({ error: 'Bad Request' });
  }
});

// Route to delete a task
app.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params; // Get task ID from the URL

  try {
    const deletedTask = await Task.findByIdAndDelete(id); // Delete the task from the database
    if (!deletedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(204).send(); // Return status 204 (no content) to indicate successful deletion
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(400).json({ error: 'Bad Request' });
  }
});

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/todolist', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// Start the server
const possiblePorts = [5000, 5001, 5002, 5003];

const tryPort = (ports) => {
  if (ports.length === 0) {
    console.error('No available ports found! Exiting...');
    process.exit(1); // Exit if no port is available
  }

  const port = ports[0];

  const server = http.createServer(app);

  server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  }).on('error', (err) => {
    console.log(`Port ${port} is occupied, trying next port...`);
    tryPort(ports.slice(1)); // Try the next port
  });
};

tryPort(possiblePorts);
