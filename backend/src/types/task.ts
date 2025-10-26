const Priority = ['low', 'medium', 'high'];
const Category = ['personal', 'work', 'shopping', 'other'];
const SortBy = ['createdAt', 'dueDate', 'priority', 'title'];

const Task = {
  title: '',
  description: '',
  priority: '',
  category: '',
  completed: false,
  dueDate: '',
  createdAt: '',
  updatedAt: ''
};

const TaskFilters = {
  search: '',
  priority: '',
  category: '',
  completed: false,
  sortBy: '',
  sortOrder: ''
};

const CreateTaskDTO = {
  title: '',
  description: '',
  priority: '',
  category: '',
  completed: false,
  dueDate: ''
};

const UpdateTaskDTO = {
  title: '',
  description: '',
  priority: '',
  category: '',
  completed: false,
  dueDate: ''
};

module.exports = { Priority, Category, SortBy, Task, TaskFilters, CreateTaskDTO, UpdateTaskDTO };