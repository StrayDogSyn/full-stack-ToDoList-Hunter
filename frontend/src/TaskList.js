// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  // Ensure Router is imported
import SplashPage from './components/SplashPage';
import MainPage from './components/MainPage';
import axios from 'axios';  // Import axios for API requests
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('/tasks');  // Fetch tasks from the API
      setTodos(response.data);
    } catch (err) {
      console.error('Error fetching todos:', err);
    }
  };

  const addTodo = async (e) => {
    e.preventDefault();
    if (!title) return;
    try {
      const response = await axios.post('/tasks', { title });  // Add a new task
      setTodos([...todos, response.data]);
      setTitle('');
    } catch (err) {
      console.error('Error adding todo:', err);
    }
  };

  const toggleComplete = async (id, completed) => {
    try {
      const response = await axios.put(`/tasks/${id}`, { completed: !completed });  // Update task completion status
      setTodos(todos.map(todo => (todo._id === id ? response.data : todo)));
    } catch (err) {
      console.error('Error updating todo:', err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`/tasks/${id}`);  // Delete a task
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (err) {
      console.error('Error deleting todo:', err);
    }
  };

  return (
    <Router>  {/* Ensure Router wraps your Routes */}
      <Routes>
        <Route path="/" element={<SplashPage />} />
        <Route
          path="/main"
          element={
            <MainPage
              todos={todos}
              toggleComplete={toggleComplete}
              deleteTodo={deleteTodo}
              addTodo={addTodo}
              title={title}
              setTitle={setTitle}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
