// src/App.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

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
    <div className="App">
      <h1>To-Do List</h1>
      <form onSubmit={addTodo}>
        <input
          type="text"
          placeholder="Add a new task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            <span
              onClick={() => toggleComplete(todo._id, todo.completed)}
              style={{ textDecoration: todo.completed ? 'line-through' : 'none', cursor: 'pointer' }}
            >
              {todo.title}
            </span>
            <button onClick={() => deleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
