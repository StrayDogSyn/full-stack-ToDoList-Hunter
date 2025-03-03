import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  // Fetch todos when the component mounts
  useEffect(() => {
    getTodos();
  }, []);

  // Get all todos from the API
  const getTodos = async () => {
    try {
      const { data } = await axios.get('/api/todos');
      setTodos(data); // Set the state with the fetched todos
    } catch (err) {
      console.error('Error fetching todos:', err);
    }
  };

  // Add a new todo
  const addTodo = (todo) => setTodos((prevTodos) => [...prevTodos, todo]);

  // Remove a todo
  const removeTodo = (id) => setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));

  // Update a todo
  const updateTodo = (updatedTodo) =>
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo._id === updatedTodo._id ? updatedTodo : todo))
    );

  return (
    <div>
      <h1>My To-Do List</h1>
      <TodoForm addTodo={addTodo} />
      <div>
        {todos.length === 0 ? (
          <p>No tasks available. Add some!</p>
        ) : (
          todos.map((todo) => (
            <TodoItem
              key={todo._id}
              todo={todo}
              removeTodo={removeTodo}
              updateTodo={updateTodo}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TodoList;
