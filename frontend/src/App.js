// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SplashPage from './components/SplashPage';
import MainPage from './components/MainPage';
import './App.css';
import TaskList from './TaskList';

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');

  // Fetch Todos on Component Mount
  useEffect(() => {
    fetchTodos();
  }, []);

  // Fetch Todos Function
  const fetchTodos = async () => {
    try {
      const response = await axios.get('/tasks');
      setTodos(response.data);
    } catch (err) {
      console.error('Error fetching todos:', err);
    }
  };

  // Add Todo Function
  const addTodo = async (e) => {
    e.preventDefault();
    if (!title) return;
    try {
      const response = await axios.post('/tasks', { title });
      setTodos([...todos, response.data]);
      setTitle('');
    } catch (err) {
      console.error('Error adding todo:', err);
    }
  };

  // Toggle Complete Function
  const toggleComplete = async (id, completed) => {
    try {
      const response = await axios.put(`/tasks/${id}`, { completed: !completed });
      setTodos(todos.map(todo => (todo._id === id ? response.data : todo)));
    } catch (err) {
      console.error('Error updating todo:', err);
    }
  };

  // Delete Todo Function
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`/tasks/${id}`);
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (err) {
      console.error('Error deleting todo:', err);
    }
  };

  return (
    <Router>
      <Routes>
        {/* Splash Page Route */}
        <Route path="/" element={<SplashPage />} />
        
        {/* Main Page Route */}
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
