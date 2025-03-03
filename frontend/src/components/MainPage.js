// src/components/MainPage.js
import React from 'react';
import TaskList from '../TaskList';
const MainPage = ({ todos, toggleComplete, deleteTodo, addTodo, title, setTitle }) => {
  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">To-Do List</h1>
      <form onSubmit={addTodo} className="mb-3">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Add a new task..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">Add</button>
        </div>
      </form>
      <TaskList todos={todos} toggleComplete={toggleComplete} deleteTodo={deleteTodo} />
    </div>
  );
};

export default MainPage;
