import { Task, CreateTaskDTO, UpdateTaskDTO, TaskFilters } from '../types/task';
import TaskModel from '../models/Task';
import { logError } from '../utils/logger';

export class TaskService {
  static async getAllTasks(filters: TaskFilters): Promise<Task[]> {
    try {
      const query: Record<string, unknown> = {};
      if (filters.search) query.$text = { $search: filters.search };
      if (filters.category) query.category = filters.category;
      if (filters.priority) query.priority = filters.priority;
      if (filters.completed !== undefined) query.completed = filters.completed === true || filters.completed === 'true';

      const sort: Record<string, 1 | -1> = {};
      sort[filters.sortBy || 'createdAt'] = filters.sortOrder === 'desc' ? -1 : 1;

      return await TaskModel.find(query).sort(sort);
    } catch (error) {
      logError(error as Error, 'TaskService.getAllTasks');
      throw error;
    }
  }

  static async createTask(taskData: CreateTaskDTO): Promise<Task> {
    try {
      const task = new TaskModel({
        ...taskData,
        dueDate: taskData.dueDate ? new Date(taskData.dueDate).toISOString() : undefined,
        completed: false
      });
      return await task.save();
    } catch (error) {
      logError(error as Error, 'TaskService.createTask');
      throw error;
    }
  }

  static async updateTask(id: string, taskData: UpdateTaskDTO): Promise<Task | null> {
    try {
      const updateData = { ...taskData };
      if (updateData.dueDate) {
        updateData.dueDate = new Date(updateData.dueDate).toISOString();
      }

      const task = await TaskModel.findByIdAndUpdate(
        id,
        { ...updateData, updatedAt: new Date().toISOString() },
        { new: true, runValidators: true }
      );

      return task;
    } catch (error) {
      logError(error as Error, 'TaskService.updateTask');
      throw error;
    }
  }

  static async deleteTask(id: string): Promise<boolean> {
    try {
      const result = await TaskModel.findByIdAndDelete(id);
      return result !== null;
    } catch (error) {
      logError(error as Error, 'TaskService.deleteTask');
      throw error;
    }
  }

  static async searchTasks(filters: TaskFilters): Promise<Task[]> {
    try {
      const query: Record<string, unknown> = {};
      if (filters.priority) query.priority = filters.priority;
      if (filters.category) query.category = filters.category;
      if (filters.completed !== undefined) query.completed = filters.completed === true || filters.completed === 'true';
      if (filters.search) {
        query.$or = [
          { title: { $regex: filters.search, $options: 'i' } },
          { description: { $regex: filters.search, $options: 'i' } }
        ];
      }

      return await TaskModel.find(query).sort({ createdAt: -1 });
    } catch (error) {
      logError(error as Error, 'TaskService.searchTasks');
      throw error;
    }
  }
}