import { Request, Response } from 'express';
import { CreateTaskDTO, UpdateTaskDTO, TaskFilters } from '../types/task';
import { TaskService } from '../services/TaskService';
import { logError } from '../utils/logger';

export const getAllTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    const filters = req.query as TaskFilters;
    const tasks = await TaskService.getAllTasks(filters);
    res.json(tasks);
  } catch (error) {
    logError(error as Error, 'getAllTasks');
    res.status(500).json({ message: 'Error fetching tasks', error: (error as Error).message });
  }
};

export const createTask = async (req: Request<{}, {}, CreateTaskDTO>, res: Response): Promise<void> => {
  try {
    const { title } = req.body;
    
    if (!title) {
      res.status(400).json({ error: 'Title is required' });
      return;
    }

    const task = await TaskService.createTask(req.body);
    res.status(201).json(task);
  } catch (error) {
    logError(error as Error, 'createTask');
    res.status(400).json({ message: 'Error creating task', error: (error as Error).message });
  }
};

export const updateTask = async (
  req: Request<{ id: string }, {}, UpdateTaskDTO>,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const task = await TaskService.updateTask(id, req.body);

    if (!task) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }

    res.json(task);
  } catch (error) {
    logError(error as Error, 'updateTask');
    res.status(400).json({ message: 'Error updating task', error: (error as Error).message });
  }
};

export const deleteTask = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const success = await TaskService.deleteTask(id);
    
    if (!success) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    logError(error as Error, 'deleteTask');
    res.status(400).json({ message: 'Error deleting task', error: (error as Error).message });
  }
};

export const filterTasks = async (req: Request<{}, {}, {}, TaskFilters>, res: Response): Promise<void> => {
  try {
    const tasks = await TaskService.searchTasks(req.query);
    res.json(tasks);
  } catch (error) {
    logError(error as Error, 'filterTasks');
    res.status(400).json({ message: 'Error filtering tasks', error: (error as Error).message });
  }
}; 