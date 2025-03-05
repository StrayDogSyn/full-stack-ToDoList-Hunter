// src/App.js
import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import TaskList from './components/TaskList';
import ErrorBoundary from './components/ErrorBoundary';
import { taskApi } from './services/api';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = await taskApi.getAll();
      setTodos(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch todos. Please try again later.');
      toast.error('Failed to fetch todos');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    try {
      const response = await taskApi.create({ title: newTodo });
      setTodos([...todos, response.data]);
      setNewTodo('');
      toast.success('Task added successfully');
    } catch (err) {
      toast.error('Failed to add task');
    }
  };

  const toggleComplete = async (id, currentStatus) => {
    try {
      const response = await taskApi.toggleComplete(id, !currentStatus);
      setTodos(todos.map(todo => 
        todo._id === id ? response.data : todo
      ));
    } catch (err) {
      toast.error('Failed to update task');
    }
  };

  const deleteTodo = async (id) => {
    try {
      await taskApi.delete(id);
      setTodos(todos.filter(todo => todo._id !== id));
      toast.success('Task deleted successfully');
    } catch (err) {
      toast.error('Failed to delete task');
    }
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto px-4">
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#363636',
                color: '#fff',
              },
            }}
          />
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">To-Do List</h1>
          
          <form onSubmit={handleSubmit} className="mb-8">
            <div className="flex gap-2">
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Add a new task"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Add
              </button>
            </div>
          </form>

          {loading ? (
            <div className="text-center">Loading...</div>
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : (
            <TaskList
              todos={todos}
              toggleComplete={toggleComplete}
              deleteTodo={deleteTodo}
            />
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;
