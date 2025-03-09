import { Request, Response } from 'express';
import { CreateTaskDTO, UpdateTaskDTO, TaskFilters } from '../types/task';
export declare const getAllTasks: (req: Request, res: Response) => Promise<void>;
export declare const createTask: (req: Request<{}, {}, CreateTaskDTO>, res: Response) => Promise<void>;
export declare const updateTask: (req: Request<{
    id: string;
}, {}, UpdateTaskDTO>, res: Response) => Promise<void>;
export declare const deleteTask: (req: Request<{
    id: string;
}>, res: Response) => Promise<void>;
export declare const filterTasks: (req: Request<{}, {}, {}, TaskFilters>, res: Response) => Promise<void>;
