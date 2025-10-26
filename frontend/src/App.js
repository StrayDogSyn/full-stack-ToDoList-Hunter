import React, { useState, useEffect } from 'react';
import './styles/index.css';
import Header from './components/Header/Header';
import TaskForm from './components/TaskForm';
import TaskFilters from './components/TaskFilters';
import Footer from './components/Footer';

// Demo data for initial load
const DEMO_TASKS = [
  {
    _id: '1',
    title: 'Welcome to StrayDog Todo List',
    description: 'This is a demo task to showcase the application. Try creating, editing, and completing tasks!',
    priority: 'high',
    category: 'Personal',
    completed: false,
    dueDate: new Date(Date.now() + 86400000 * 7).toISOString(), // 7 days from now
    createdAt: new Date().toISOString()
  },
  {
    _id: '2',
    title: 'Explore Task Features',
    description: 'Filter by category, priority, or completion status. Sort tasks by different criteria.',
    priority: 'medium',
    category: 'Work',
    completed: false,
    dueDate: new Date(Date.now() + 86400000 * 3).toISOString(), // 3 days from now
    createdAt: new Date(Date.now() - 3600000).toISOString()
  }
];

function App() {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState(['Personal', 'Work', 'Study', 'Health']);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    priority: '',
    completed: undefined,
    sortBy: 'createdAt',
    sortOrder: 'desc'
  });
  const [error, setError] = useState('');

  // Initialize tasks from localStorage or use demo data
  useEffect(() => {
    const storedTasks = localStorage.getItem('todoTasks');
    if (storedTasks) {
      try {
        setTasks(JSON.parse(storedTasks));
      } catch (err) {
        console.error('Error loading tasks from localStorage:', err);
        setTasks(DEMO_TASKS);
      }
    } else {
      setTasks(DEMO_TASKS);
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('todoTasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  // Update categories based on tasks
  useEffect(() => {
    const taskCategories = [...new Set(tasks.map(task => task.category).filter(Boolean))];
    const allCategories = [...new Set([...categories, ...taskCategories])];
    setCategories(allCategories);
  }, [tasks]);

  const handleTaskCreate = (taskData) => {
    try {
      const newTask = {
        ...taskData,
        _id: Date.now().toString(),
        completed: false,
        createdAt: new Date().toISOString()
      };
      setTasks(prev => [newTask, ...prev]);
      setError('');
    } catch (err) {
      setError('Error creating task. Please try again.');
      console.error('Error creating task:', err);
    }
  };

  const handleTaskUpdate = (id, taskData) => {
    try {
      setTasks(prev => prev.map(task => 
        task._id === id ? { ...task, ...taskData } : task
      ));
      setError('');
    } catch (err) {
      setError('Error updating task. Please try again.');
      console.error('Error updating task:', err);
    }
  };

  const handleTaskDelete = (id) => {
    try {
      setTasks(prev => prev.filter(task => task._id !== id));
      setError('');
    } catch (err) {
      setError('Error deleting task. Please try again.');
      console.error('Error deleting task:', err);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  // Filter and sort tasks
  const getFilteredTasks = () => {
    let filtered = [...tasks];

    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchLower) ||
        (task.description && task.description.toLowerCase().includes(searchLower))
      );
    }

    // Apply category filter
    if (filters.category) {
      filtered = filtered.filter(task => task.category === filters.category);
    }

    // Apply priority filter
    if (filters.priority) {
      filtered = filtered.filter(task => task.priority === filters.priority);
    }

    // Apply completion filter
    if (filters.completed !== undefined) {
      filtered = filtered.filter(task => task.completed === filters.completed);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aVal = a[filters.sortBy];
      let bVal = b[filters.sortBy];

      // Handle date sorting
      if (filters.sortBy === 'createdAt' || filters.sortBy === 'dueDate') {
        aVal = aVal ? new Date(aVal).getTime() : 0;
        bVal = bVal ? new Date(bVal).getTime() : 0;
      }

      // Handle priority sorting (high > medium > low)
      if (filters.sortBy === 'priority') {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        aVal = priorityOrder[aVal] || 0;
        bVal = priorityOrder[bVal] || 0;
      }

      if (filters.sortOrder === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

    return filtered;
  };

  const filteredTasks = getFilteredTasks();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-dark via-black-rich to-primary-dark flex flex-col">
      <Header />
      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Demo Mode Notice */}
          <div className="glassmorphism p-4 rounded-lg animate-fade-in border border-gold/30">
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-gold" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <p className="text-gold/90 text-sm">
                <span className="font-semibold">Demo Mode:</span> Your tasks are saved locally in your browser. Data persists across sessions.
              </p>
            </div>
          </div>

          <div className="glassmorphism p-6 rounded-lg animate-fade-in">
            <TaskForm onSubmit={handleTaskCreate} />
          </div>

          <div className="glassmorphism p-6 rounded-lg animate-fade-in">
            <TaskFilters
              filters={filters}
              categories={categories}
              onChange={handleFilterChange}
            />
          </div>

          {error && (
            <div className="bg-red-900/20 border border-red-500/30 text-red-300 p-4 rounded-lg animate-fade-in">
              {error}
            </div>
          )}

          {filteredTasks.length === 0 ? (
            <div className="glassmorphism p-12 rounded-lg text-center animate-fade-in">
              <svg className="w-16 h-16 mx-auto mb-4 text-gold/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <h3 className="text-xl font-semibold metallic-text mb-2">No Tasks Found</h3>
              <p className="text-gold/60">
                {filters.search || filters.category || filters.priority || filters.completed !== undefined
                  ? 'Try adjusting your filters or create a new task.'
                  : 'Create your first task to get started!'}
              </p>
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredTasks.map(task => (
                <div
                  key={task._id}
                  className="glassmorphism p-6 rounded-lg hover:shadow-gold transition-all animate-slide-up group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className={`text-lg font-semibold mb-2 group-hover:text-gold transition-colors ${
                        task.completed ? 'line-through text-gold/40' : 'metallic-text'
                      }`}>
                        {task.title}
                      </h3>
                      {task.description && (
                        <p className={`group-hover:text-gold/80 transition-colors ${
                          task.completed ? 'text-gold/30' : 'text-gold/60'
                        }`}>
                          {task.description}
                        </p>
                      )}
                      <div className="flex flex-wrap gap-2 mt-3">
                        {task.category && (
                          <span className="bg-gold/10 text-gold px-3 py-1 rounded-full text-sm font-medium border border-gold/30">
                            {task.category}
                          </span>
                        )}
                        {task.priority && (
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            task.priority === 'high' ? 'bg-red-900/30 text-red-300 border border-red-500/30' :
                            task.priority === 'medium' ? 'bg-yellow-900/30 text-yellow-300 border border-yellow-500/30' :
                            'bg-green-900/30 text-green-300 border border-green-500/30'
                          }`}>
                            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                          </span>
                        )}
                        {task.dueDate && (
                          <span className="bg-purple-900/20 text-purple-300 px-3 py-1 rounded-full text-sm font-medium border border-purple-500/30">
                            📅 {new Date(task.dueDate).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gold/10">
                    <button
                      onClick={() => handleTaskUpdate(task._id, { completed: !task.completed })}
                      className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
                        task.completed 
                          ? 'bg-green-900/20 text-green-300 hover:bg-green-900/30 border border-green-500/30' 
                          : 'bg-gold/10 text-gold hover:bg-gold/20 border border-gold/30'
                      }`}
                    >
                      {task.completed ? '✓ Completed' : 'Mark Complete'}
                    </button>
                    <button
                      onClick={() => handleTaskDelete(task._id)}
                      className="px-4 py-2 rounded-md bg-red-900/20 text-red-300 hover:bg-red-900/30 transition-all border border-red-500/30"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;