// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SplashPage from './components/SplashPage';
import MainPage from './components/MainPage';
import TaskList from './TaskList'; // You imported this, now use it
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('/tasks');
      setTodos(response.data);
    } catch (err) {
      console.error('Error fetching todos:', err);
    }
  };

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

  const toggleComplete = async (id, completed) => {
    try {
      const response = await axios.put(`/tasks/${id}`, { completed: !completed });
      setTodos(todos.map(todo => (todo._id === id ? response.data : todo)));
    } catch (err) {
      console.error('Error updating todo:', err);
    }
  };

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
        <Route path="/" element={<SplashPage />} />
        <Route path="/main" element={<MainPage todos={todos} toggleComplete={toggleComplete} deleteTodo={deleteTodo} addTodo={addTodo} title={title} setTitle={setTitle} />} />
        {/* Add TaskList Component to Main Page or elsewhere */}
        <Route path="/tasklist" element={<TaskList todos={todos} toggleComplete={toggleComplete} deleteTodo={deleteTodo} />} />
      </Routes>
    </Router>
  );
}

export default App;
