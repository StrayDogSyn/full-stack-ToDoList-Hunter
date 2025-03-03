// components/TodoItem.js

import React from 'react';
import axios from 'axios';

const TodoItem = ({ todo, removeTodo, updateTodo }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`/api/todos/${todo._id}`);
      removeTodo(todo._id);
    } catch (err) {
      console.error('Error deleting todo:', err);
    }
  };

  const handleToggleComplete = async () => {
    try {
      const res = await axios.patch(`/api/todos/${todo._id}`, {
        completed: !todo.completed,
      });
      updateTodo(res.data);
    } catch (err) {
      console.error('Error updating todo:', err);
    }
  };

  return (
    <div className="todo-item">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleToggleComplete}
      />
      <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
        {todo.text}
      </span>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default TodoItem;
