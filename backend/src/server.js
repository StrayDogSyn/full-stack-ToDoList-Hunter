import express from 'express';
import mongoose from 'mongoose';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import Task from '../models/task.model.js';

const app = express();
const PORT = 5001; // Fixed port

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Add a basic health check route
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Route to get all tasks with filtering and sorting
app.get('/tasks', async (req, res) => {
  try {
    const {
      search,
      category,
      priority,
      completed,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    console.log('Fetching tasks with filters:', { search, category, priority, completed, sortBy, sortOrder });

    // Build query
    const query = {};
    if (search) {
      query.$text = { $search: search };
    }
    if (category) {
      query.category = category;
    }
    if (priority) {
      query.priority = priority;
    }
    if (completed !== undefined) {
      query.completed = completed === 'true';
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const tasks = await Task.find(query).sort(sort);
    console.log(`Found ${tasks.length} tasks`);
    res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to get task categories
app.get('/categories', async (req, res) => {
  try {
    const categories = await Task.distinct('category');
    console.log('Available categories:', categories);
    res.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to create a new task
app.post('/tasks', async (req, res) => {
  console.log('Creating new task with data:', req.body);
  const { title, description, category, priority, dueDate } = req.body;
  
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  const newTask = new Task({
    title,
    description,
    category: category || 'General',
    priority: priority || 'Medium',
    dueDate: dueDate ? new Date(dueDate) : null,
    completed: false
  });

  try {
    const savedTask = await newTask.save();
    console.log('Task saved successfully:', savedTask);
    res.status(201).json(savedTask);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(400).json({ error: 'Bad Request', details: error.message });
  }
});

// Route to update a task
app.put('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  console.log('Updating task:', id, 'with data:', req.body);
  
  const { title, description, category, priority, dueDate, completed } = req.body;

  try {
    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (category !== undefined) updateData.category = category;
    if (priority !== undefined) updateData.priority = priority;
    if (dueDate !== undefined) updateData.dueDate = dueDate ? new Date(dueDate) : null;
    if (completed !== undefined) updateData.completed = completed;

    const updatedTask = await Task.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedTask) {
      console.log('Task not found:', id);
      return res.status(404).json({ error: 'Task not found' });
    }
    console.log('Task updated successfully:', updatedTask);
    res.json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(400).json({ error: 'Bad Request', details: error.message });
  }
});

// Route to delete a task
app.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  console.log('Deleting task:', id);

  try {
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      console.log('Task not found:', id);
      return res.status(404).json({ error: 'Task not found' });
    }
    console.log('Task deleted successfully:', deletedTask);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(400).json({ error: 'Bad Request', details: error.message });
  }
});

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/todolist')
  .then(() => {
    console.log('Connected to MongoDB');
    // Create text index if it doesn't exist
    Task.collection.createIndex({ title: 'text', description: 'text' })
      .then(() => console.log('Text index created'))
      .catch(err => console.log('Text index already exists or error:', err));
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// Start the server
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log('Health check available at http://localhost:5001/health');
}); 