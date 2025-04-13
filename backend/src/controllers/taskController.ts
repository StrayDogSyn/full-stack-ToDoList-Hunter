const TaskService = require('../services/TaskService');
const { logError } = require('../utils/logger');

const getAllTasks = async (req, res) => {
  try {
    const filters = req.query;
    const tasks = await TaskService.getAllTasks(filters);
    res.json(tasks);
  } catch (error) {
    logError(error, 'getAllTasks');
    res.status(500).json({ message: 'Error fetching tasks', error: error.message });
  }
};

const createTask = async (req, res) => {
  try {
    const { title } = req.body;
    
    if (!title) {
      res.status(400).json({ error: 'Title is required' });
      return;
    }

    const task = await TaskService.createTask(req.body);
    res.status(201).json(task);
  } catch (error) {
    logError(error, 'createTask');
    res.status(400).json({ message: 'Error creating task', error: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await TaskService.updateTask(id, req.body);

    if (!task) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }

    res.json(task);
  } catch (error) {
    logError(error, 'updateTask');
    res.status(400).json({ message: 'Error updating task', error: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const success = await TaskService.deleteTask(id);
    
    if (!success) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    logError(error, 'deleteTask');
    res.status(400).json({ message: 'Error deleting task', error: error.message });
  }
};

const filterTasks = async (req, res) => {
  try {
    const tasks = await TaskService.searchTasks(req.query);
    res.json(tasks);
  } catch (error) {
    logError(error, 'filterTasks');
    res.status(400).json({ message: 'Error filtering tasks', error: error.message });
  }
};

module.exports = { getAllTasks, createTask, updateTask, deleteTask, filterTasks };