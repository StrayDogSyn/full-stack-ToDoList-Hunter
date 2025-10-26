export type Priority = 'low' | 'medium' | 'high';
export type Category = 'personal' | 'work' | 'shopping' | 'other';
export type SortBy = 'createdAt' | 'dueDate' | 'priority' | 'title';
export interface Task {
    title: string;
    description?: string;
    priority: Priority;
    category: Category;
    completed: boolean;
    dueDate?: string;
    createdAt: string;
    updatedAt: string;
}
export interface TaskFilters {
    search?: string;
    priority?: Priority;
    category?: Category;
    completed?: boolean | string;
    sortBy?: SortBy;
    sortOrder?: 'asc' | 'desc';
}
export type CreateTaskDTO = Omit<Task, 'createdAt' | 'updatedAt'>;
export type UpdateTaskDTO = Partial<CreateTaskDTO>;
