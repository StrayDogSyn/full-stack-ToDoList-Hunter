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
      <div className="min-h-screen bg-black text-gold flex flex-col items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Connection Error</h1>
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={checkServerConnection}
            className="bg-gold text-black px-4 py-2 rounded hover:bg-gold-dark transition-colors"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-gold">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <TaskForm onSubmit={handleTaskCreate} />
        <TaskFilters
          filters={filters}
          categories={categories}
          onChange={handleFilterChange}
        />
        {error && (
          <div className="bg-red-900 text-white p-4 rounded mb-4">
            {error}
          </div>
        )}
        <div className="grid gap-4">
          {tasks.map(task => (
            <div
              key={task._id}
              className="bg-black border border-gold p-4 rounded shadow-lg hover:shadow-gold transition-shadow"
            >
              <div className="flex items-center justify-between">
                <h3 className={`text-lg font-semibold ${task.completed ? 'line-through text-gray-400' : ''}`}>
                  {task.title}
                </h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleTaskUpdate(task._id, { completed: !task.completed })}
                    className="text-gold hover:text-gold-dark"
                  >
                    {task.completed ? 'Undo' : 'Complete'}
                  </button>
                  <button
                    onClick={() => handleTaskDelete(task._id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
              {task.description && (
                <p className="mt-2 text-gray-300">{task.description}</p>
              )}
              <div className="mt-4 flex flex-wrap gap-2">
                {task.category && (
                  <span className="bg-gold/20 text-gold px-2 py-1 rounded text-sm">
                    {task.category}
                  </span>
                )}
                {task.priority && (
                  <span className={`px-2 py-1 rounded text-sm ${
                    task.priority === 'High' ? 'bg-red-900/50 text-red-300' :
                    task.priority === 'Medium' ? 'bg-yellow-900/50 text-yellow-300' :
                    'bg-green-900/50 text-green-300'
                  }`}>
                    {task.priority}
                  </span>
                )}
                {task.dueDate && (
                  <span className="bg-blue-900/50 text-blue-300 px-2 py-1 rounded text-sm">
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;