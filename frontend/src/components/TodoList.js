// components/TodoList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = async () => {
    try {
      const res = await axios.get('/api/todos');
      setTodos(res.data);
    } catch (err) {
      console.error('Error fetching todos:', err);
    }
  };

  const addTodo = (todo) => setTodos([...todos, todo]);

  const removeTodo = (id) => setTodos(todos.filter((todo) => todo._id !== id));

  const updateTodo = (updatedTodo) =>
    setTodos(todos.map((todo) => (todo._id === updatedTodo._id ? updatedTodo : todo)));

  return (
    <div>
      <h1>My To-Do List</h1>
      <TodoForm addTodo={addTodo} />
      {todos.map((todo) => (
        <TodoItem
          key={todo._id}
          todo={todo}
          removeTodo={removeTodo}
          updateTodo={updateTodo}
        />
      ))}
    </div>
  );
};

export default TodoList;
