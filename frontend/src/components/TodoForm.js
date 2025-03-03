// components/TodoForm.js

import React, { useState } from 'react';
import axios from 'axios';

const TodoForm = ({ addTodo }) => {
  const [text, setText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text) return;

    try {
      const res = await axios.post('/api/todos', { text });
      addTodo(res.data);
      setText('');
    } catch (err) {
      console.error('Error adding todo:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a new task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default TodoForm;
