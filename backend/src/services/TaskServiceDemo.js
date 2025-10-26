// In-memory task service for demo purposes
let tasks = [
  {
    _id: '1',
    title: 'Welcome to StrayDog Todo!',
    description: 'This is a demo task. Try creating, editing, and completing tasks!',
    completed: false,
    priority: 'medium',
    category: 'personal',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: '2',
    title: 'Check out the features',
    description: 'Filter by priority, search tasks, and organize by category',
    completed: false,
    priority: 'high',
    category: 'work',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

let nextId = 3;

class TaskServiceDemo {
  async getAllTasks(filters = {}) {
    let filteredTasks = [...tasks];

    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filteredTasks = filteredTasks.filter(task =>
        task.title.toLowerCase().includes(searchLower) ||
        (task.description && task.description.toLowerCase().includes(searchLower))
      );
    }

    // Apply category filter
    if (filters.category) {
      filteredTasks = filteredTasks.filter(task => task.category === filters.category);
    }

    // Apply priority filter
    if (filters.priority) {
      filteredTasks = filteredTasks.filter(task => task.priority === filters.priority);
    }

    // Apply completed filter
    if (filters.completed !== undefined) {
      const isCompleted = filters.completed === 'true' || filters.completed === true;
      filteredTasks = filteredTasks.filter(task => task.completed === isCompleted);
    }

    // Apply sorting
    const sortBy = filters.sortBy || 'createdAt';
    const sortOrder = filters.sortOrder || 'desc';
    
    filteredTasks.sort((a, b) => {
      let aVal = a[sortBy];
      let bVal = b[sortBy];
      
      if (sortBy === 'createdAt' || sortBy === 'updatedAt') {
        aVal = new Date(aVal);
        bVal = new Date(bVal);
      }
      
      if (sortOrder === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

    return filteredTasks;
  }

  async createTask(taskData) {
    const newTask = {
      _id: String(nextId++),
      title: taskData.title,
      description: taskData.description || '',
      completed: taskData.completed || false,
      priority: taskData.priority || 'medium',
      category: taskData.category || 'personal',
      dueDate: taskData.dueDate || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    tasks.push(newTask);
    return newTask;
  }

  async updateTask(id, updates) {
    const index = tasks.findIndex(task => task._id === id);
    
    if (index === -1) {
      return null;
    }
    
    tasks[index] = {
      ...tasks[index],
      ...updates,
      _id: id, // Preserve ID
      updatedAt: new Date().toISOString()
    };
    
    return tasks[index];
  }

  async deleteTask(id) {
    const index = tasks.findIndex(task => task._id === id);
    
    if (index === -1) {
      return false;
    }
    
    tasks.splice(index, 1);
    return true;
  }

  async searchTasks(query) {
    return this.getAllTasks(query);
  }
}

export default new TaskServiceDemo();
