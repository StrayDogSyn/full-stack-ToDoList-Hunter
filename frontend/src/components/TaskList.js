// src/components/TaskList.js
import React from 'react';

function TaskList({ todos, toggleComplete, deleteTodo }) {
  return (
    <div>
      <h2>Task List</h2>
      {todos.length === 0 ? (
        <p>No tasks available. Add some!</p>
      ) : (
        <ul>
          {todos.map(todo => (
            <li key={todo._id} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span
                onClick={() => toggleComplete(todo._id, todo.completed)}
                style={{
                  textDecoration: todo.completed ? 'line-through' : 'none',
                  cursor: 'pointer',
                  flexGrow: 1
                }}
              >
                {todo.title}
              </span>
              <button onClick={() => deleteTodo(todo._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskList;
