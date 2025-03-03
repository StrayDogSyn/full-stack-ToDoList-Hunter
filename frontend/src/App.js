// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from './components/TaskList';
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
    <div className="App">
      <h1>To-Do List</h1>
      <TaskList todos={todos} toggleComplete={toggleComplete} deleteTodo={deleteTodo} />
      <form onSubmit={addTodo}>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Add a new task" />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default App;
