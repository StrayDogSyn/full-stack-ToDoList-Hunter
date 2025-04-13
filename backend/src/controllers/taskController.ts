import TaskService from '../services/TaskService.js';
import { logError } from '../utils/logger.js';
import { Request, Response } from 'express';

const getAllTasks = async (req: Request, res: Response) => {
  try {
    const filters = req.query;
    const tasks = await TaskService.getAllTasks(filters);
    res.json(tasks);
  } catch (error: unknown) {
    logError(error, 'getAllTasks');
    res.status(500).json({ message: 'Error fetching tasks', error: error instanceof Error ? error.message : 'Unknown error' });
  }
};

const createTask = async (req: Request, res: Response) => {
  try {
    const { title } = req.body;
    
    if (!title) {
      res.status(400).json({ error: 'Title is required' });
      return;
    }

    const task = await TaskService.createTask(req.body);
    res.status(201).json(task);
  } catch (error: unknown) {
    logError(error, 'createTask');
    res.status(400).json({ message: 'Error creating task', error: error instanceof Error ? error.message : 'Unknown error' });
  }
};

const updateTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const task = await TaskService.updateTask(id, req.body);

    if (!task) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }

    res.json(task);
  } catch (error: unknown) {
    logError(error, 'updateTask');
    res.status(400).json({ message: 'Error updating task', error: error instanceof Error ? error.message : 'Unknown error' });
  }
};

const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const success = await TaskService.deleteTask(id);
    
    if (!success) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }

    res.json({ message: 'Task deleted successfully' });
  } catch (error: unknown) {
    logError(error, 'deleteTask');
    res.status(400).json({ message: 'Error deleting task', error: error instanceof Error ? error.message : 'Unknown error' });
  }
};

const filterTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await TaskService.searchTasks(req.query);
    res.json(tasks);
  } catch (error: unknown) {
    logError(error, 'filterTasks');
    res.status(400).json({ message: 'Error filtering tasks', error: error instanceof Error ? error.message : 'Unknown error' });
  }
};

export { getAllTasks, createTask, updateTask, deleteTask, filterTasks };