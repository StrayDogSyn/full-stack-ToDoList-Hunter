import express from 'express';
import mongoose from 'mongoose';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import Task from './models/task.model.js'; // Ensure this path is correct

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/tasks', async (req, res) => {
  const { title, description } = req.body;
  const newTask = new Task({ title, description, completed: false });

  try {
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(400).json({ error: 'Bad Request' });
  }
});

app.put('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(id, { completed }, { new: true });
    if (!updatedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(400).json({ error: 'Bad Request' });
  }
});

app.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(400).json({ error: 'Bad Request' });
  }
});

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/todolist', {});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
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
