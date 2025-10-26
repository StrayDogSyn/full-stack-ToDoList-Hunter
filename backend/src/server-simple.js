import express from 'express';
import cors from 'cors';

const app = express();
const port = 5001;

app.use(cors());
app.use(express.json());

// In-memory task storage
let tasks = [
  {
    _id: '1',
    title: 'Welcome to StrayDog Todo!',
    description: 'This is a demo task. Try creating, editing, and completing tasks!',
    completed: false,
    priority: 'medium',
    category: 'personal',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: '2',
    title: 'Check out the features',
    description: 'Filter by priority, search tasks, and organize by category',
    completed: false,
    priority: 'high',
    category: 'work',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

let nextId = 3;

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    mode: 'demo',
    message: 'Server running in demo mode with in-memory storage',
    timestamp: new Date().toISOString() 
  });
});

// Categories
app.get('/api/categories', (req, res) => {
  res.json(['personal', 'work', 'shopping', 'other']);
});

// Get all tasks
app.get('/api/tasks', (req, res) => {
  try {
    let filteredTasks = [...tasks];

    // Apply filters
    const { search, category, priority, completed, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;

    if (search) {
      const searchLower = search.toLowerCase();
      filteredTasks = filteredTasks.filter(task =>
        task.title.toLowerCase().includes(searchLower) ||
        (task.description && task.description.toLowerCase().includes(searchLower))
      );
    }

    if (category) {
      filteredTasks = filteredTasks.filter(task => task.category === category);
    }

    if (priority) {
      filteredTasks = filteredTasks.filter(task => task.priority === priority);
    }

    if (completed !== undefined) {
      const isCompleted = completed === 'true';
      filteredTasks = filteredTasks.filter(task => task.completed === isCompleted);
    }

    // Sort
    filteredTasks.sort((a, b) => {
      const aVal = sortBy === 'createdAt' || sortBy === 'updatedAt' ? new Date(a[sortBy]) : a[sortBy];
      const bVal = sortBy === 'createdAt' || sortBy === 'updatedAt' ? new Date(b[sortBy]) : b[sortBy];
      return sortOrder === 'asc' ? (aVal > bVal ? 1 : -1) : (aVal < bVal ? 1 : -1);
    });

    res.json(filteredTasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks', error: error.message });
  }
});

// Create task
app.post('/api/tasks', (req, res) => {
  try {
    const { title, description, priority, category, dueDate } = req.body;
    
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    const newTask = {
      _id: String(nextId++),
      title,
      description: description || '',
      completed: false,
      priority: priority || 'medium',
      category: category || 'personal',
      dueDate: dueDate || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    tasks.push(newTask);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ message: 'Error creating task', error: error.message });
  }
});

// Update task
app.put('/api/tasks/:id', (req, res) => {
  try {
    const { id } = req.params;
    const index = tasks.findIndex(task => task._id === id);
    
    if (index === -1) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    tasks[index] = {
      ...tasks[index],
      ...req.body,
      _id: id,
      updatedAt: new Date().toISOString()
    };
    
    res.json(tasks[index]);
  } catch (error) {
    res.status(400).json({ message: 'Error updating task', error: error.message });
  }
});

// Delete task
app.delete('/api/tasks/:id', (req, res) => {
  try {
    const { id } = req.params;
    const index = tasks.findIndex(task => task._id === id);
    
    if (index === -1) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    tasks.splice(index, 1);
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting task', error: error.message });
  }
});

app.listen(port, () => {
  console.log('🚀 StrayDog Todo API Server - DEMO MODE');
  console.log('========================================');
  console.log(`✅ Server running on http://localhost:${port}`);
  console.log(`💚 Health check: http://localhost:${port}/api/health`);
  console.log(`📝 Note: Using in-memory storage (data will not persist)`);
  console.log('========================================');
});
