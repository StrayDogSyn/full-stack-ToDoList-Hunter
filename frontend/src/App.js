import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/index.css';
import Header from './components/Header/Header';
import TaskForm from './components/TaskForm';
import TaskFilters from './components/TaskFilters';
import Footer from './components/Footer';

// Add fallback value for API URL
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

function App() {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    priority: '',
    completed: undefined,
    sortBy: 'createdAt',
    sortOrder: 'desc'
  });
  const [error, setError] = useState('');
  const [serverConnected, setServerConnected] = useState(false);

  const checkServerConnection = async () => {
    try {
      await axios.get(`${API_URL}/health`);
      setServerConnected(true);
      setError('');
    } catch (err) {
      setServerConnected(false);
      setError('Unable to connect to server. Please check if the backend is running.');
      console.error('Server connection error:', err);
    }
  };

  useEffect(() => {
    checkServerConnection();
  }, []);

  useEffect(() => {
    if (serverConnected) {
      fetchCategories();
      fetchTasks();
    }
  }, [serverConnected, filters]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${API_URL}/tasks`, { params: filters });
      setTasks(response.data);
    } catch (err) {
      setError('Error fetching tasks. Please try again.');
      console.error('Error fetching tasks:', err);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_URL}/categories`);
      setCategories(response.data);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  const handleTaskCreate = async (taskData) => {
    try {
      await axios.post(`${API_URL}/tasks`, taskData);
      fetchTasks();
      fetchCategories();
    } catch (err) {
      setError('Error creating task. Please try again.');
      console.error('Error creating task:', err);
    }
  };

  const handleTaskUpdate = async (id, taskData) => {
    try {
      await axios.put(`${API_URL}/tasks/${id}`, taskData);
      fetchTasks();
    } catch (err) {
      setError('Error updating task. Please try again.');
      console.error('Error updating task:', err);
    }
  };

  const handleTaskDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      setError('Error deleting task. Please try again.');
      console.error('Error deleting task:', err);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  if (!serverConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-dark to-black flex items-center justify-center">
        <div className="glassmorphism p-8 rounded-lg max-w-md w-full mx-4 animate-fade-in">
          <h2 className="text-2xl font-semibold text-gradient-primary mb-4">Connection Error</h2>
          <p className="text-neutral mb-6">Unable to connect to the server. Please check your connection and try again.</p>
          <button
            onClick={checkServerConnection}
            className="btn-primary w-full flex items-center justify-center gap-2 hover:shadow-glow transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-dark via-black to-primary-dark">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
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

          <div className="grid gap-4">
            {tasks.map(task => (
              <div
                key={task._id}
                className="glassmorphism p-6 rounded-lg hover:shadow-glow transition-all animate-slide-up"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gradient-accent mb-2">{task.title}</h3>
                    <p className="text-neutral/80">{task.description}</p>
                  </div>
                  <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2">
                    {task.priority && (
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        task.priority === 'High' ? 'bg-red-900/30 text-red-300 border border-red-500/30' :
                        task.priority === 'Medium' ? 'bg-yellow-900/30 text-yellow-300 border border-yellow-500/30' :
                        'bg-green-900/30 text-green-300 border border-green-500/30'
                      }`}>
                        {task.priority}
                      </span>
                    )}
                    {task.dueDate && (
                      <span className="bg-secondary/10 text-secondary-light px-3 py-1 rounded-full text-sm font-medium border border-secondary/30">
                        Due: {new Date(task.dueDate).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3 mt-4 pt-4 border-t border-white/10">
                  <button
                    onClick={() => handleTaskUpdate(task._id, { completed: !task.completed })}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
                      task.completed 
                        ? 'bg-green-900/20 text-green-300 hover:bg-green-900/30' 
                        : 'bg-secondary/10 text-secondary-light hover:bg-secondary/20'
                    }`}
                  >
                    {task.completed ? 'Completed' : 'Mark Complete'}
                  </button>
                  <button
                    onClick={() => handleTaskDelete(task._id)}
                    className="px-4 py-2 rounded-md bg-red-900/20 text-red-300 hover:bg-red-900/30 transition-all"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;