import React from 'react';
import axios from 'axios';

const TodoItem = ({ todo, removeTodo, updateTodo }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`/api/todos/${todo._id}`);
      removeTodo(todo._id); // update local state
    } catch (err) {
      console.error('Error deleting todo:', err);
    }
  };

  const handleToggleComplete = async () => {
    try {
      const updatedTodo = { ...todo, completed: !todo.completed }; // Toggle completed status
      const res = await axios.patch(`/api/todos/${todo._id}`, updatedTodo);
      updateTodo(res.data); // update local state with the updated todo
    } catch (err) {
      console.error('Error updating todo:', err);
    }
  };

  return (
    <div className="todo-item" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
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
