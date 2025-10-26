import { Task, CreateTaskDTO, UpdateTaskDTO, TaskFilters } from '../types/task';
export declare class TaskService {
    static getAllTasks(filters: TaskFilters): Promise<Task[]>;
    static createTask(taskData: CreateTaskDTO): Promise<Task>;
    static updateTask(id: string, taskData: UpdateTaskDTO): Promise<Task | null>;
    static deleteTask(id: string): Promise<boolean>;
    static searchTasks(filters: TaskFilters): Promise<Task[]>;
}
