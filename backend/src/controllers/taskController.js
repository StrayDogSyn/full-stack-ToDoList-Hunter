import Task from '../models/Task.js';
import logger from '../utils/logger.js';

export const getAllTasks = async (req, res) => {
  try {
    const { search, category, priority, completed, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;

    logger.info('Fetching tasks with filters:', { search, category, priority, completed, sortBy, sortOrder });

    const query = {};
    if (search) query.$text = { $search: search };
    if (category) query.category = category;
    if (priority) query.priority = priority;
    if (completed !== undefined) query.completed = completed === 'true';

    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const tasks = await Task.find(query).sort(sort);
    logger.info(`Found ${tasks.length} tasks`);
    res.json(tasks);
  } catch (error) {
    logger.error("Error fetching tasks:", error);
    res.status(500).json({ message: 'Error fetching tasks', error: error.message });
  }
};

export const createTask = async (req, res) => {
  try {
    const { title, description, category, priority, dueDate } = req.body;
    
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    const task = new Task({
      title,
      description,
      category: category || 'personal',
      priority: priority || 'medium',
      dueDate: dueDate ? new Date(dueDate) : null,
      completed: false
    });

    const savedTask = await task.save();
    logger.info('Task created:', savedTask);
    res.status(201).json(savedTask);
  } catch (error) {
    logger.error("Error creating task:", error);
    res.status(400).json({ message: 'Error creating task', error: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndUpdate(
      id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );
    if (!task) {
      logger.warn('Task not found:', id);
      return res.status(404).json({ message: 'Task not found' });
    }

    logger.info('Task updated:', task);
    res.json(task);
  } catch (error) {
    logger.error("Error updating task:", error);
    res.status(400).json({ message: 'Error updating task', error: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);
    
    if (!task) {
      logger.warn('Task not found:', id);
      return res.status(404).json({ message: 'Task not found' });
    }

    logger.info('Task deleted:', id);
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    logger.error("Error deleting task:", error);
    res.status(400).json({ message: 'Error deleting task', error: error.message });
  }
};

export const filterTasks = async (req, res) => {
  try {
    const { priority, category, completed, search } = req.query;
    const query = {};

    if (priority) {
      query.priority = priority;
    }
    if (category) {
      query.category = category;
    }
    if (completed !== undefined) {
      query.completed = completed === 'true';
    }
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const tasks = await Task.find(query).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(400).json({ message: 'Error filtering tasks', error: error.message });
  }
};