import React, { useState } from 'react';
import axios from 'axios';

const TodoForm = ({ addTodo }) => {
  const [text, setText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return; // prevent empty task submission

    try {
      const res = await axios.post('/api/todos', { text });
      addTodo(res.data); // Assuming res.data contains the new todo
      setText(''); // clear the input field after submission
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
        required
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default TodoForm;
