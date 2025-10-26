import TaskModel from '../models/Task';
import { logError } from '../utils/logger';
export class TaskService {
    static async getAllTasks(filters) {
        try {
            const query = {};
            if (filters.search)
                query.$text = { $search: filters.search };
            if (filters.category)
                query.category = filters.category;
            if (filters.priority)
                query.priority = filters.priority;
            if (filters.completed !== undefined)
                query.completed = filters.completed === true || filters.completed === 'true';
            const sort = {};
            sort[filters.sortBy || 'createdAt'] = filters.sortOrder === 'desc' ? -1 : 1;
            return await TaskModel.find(query).sort(sort);
        }
        catch (error) {
            logError(error, 'TaskService.getAllTasks');
            throw error;
        }
    }
    static async createTask(taskData) {
        try {
            const task = new TaskModel({
                ...taskData,
                dueDate: taskData.dueDate ? new Date(taskData.dueDate).toISOString() : undefined,
                completed: false
            });
            return await task.save();
        }
        catch (error) {
            logError(error, 'TaskService.createTask');
            throw error;
        }
    }
    static async updateTask(id, taskData) {
        try {
            const updateData = { ...taskData };
            if (updateData.dueDate) {
                updateData.dueDate = new Date(updateData.dueDate).toISOString();
            }
            const task = await TaskModel.findByIdAndUpdate(id, { ...updateData, updatedAt: new Date().toISOString() }, { new: true, runValidators: true });
            return task;
        }
        catch (error) {
            logError(error, 'TaskService.updateTask');
            throw error;
        }
    }
    static async deleteTask(id) {
        try {
            const result = await TaskModel.findByIdAndDelete(id);
            return result !== null;
        }
        catch (error) {
            logError(error, 'TaskService.deleteTask');
            throw error;
        }
    }
    static async searchTasks(filters) {
        try {
            const query = {};
            if (filters.priority)
                query.priority = filters.priority;
            if (filters.category)
                query.category = filters.category;
            if (filters.completed !== undefined)
                query.completed = filters.completed === true || filters.completed === 'true';
            if (filters.search) {
                query.$or = [
                    { title: { $regex: filters.search, $options: 'i' } },
                    { description: { $regex: filters.search, $options: 'i' } }
                ];
            }
            return await TaskModel.find(query).sort({ createdAt: -1 });
        }
        catch (error) {
            logError(error, 'TaskService.searchTasks');
            throw error;
        }
    }
}
//# sourceMappingURL=TaskService.js.map