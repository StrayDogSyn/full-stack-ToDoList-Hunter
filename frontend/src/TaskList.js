import React from 'react';

function TaskList({ todos, toggleComplete, deleteTodo }) {
  return (
    <ul className="list-group">
      {todos.map((todo) => (
        <li key={todo._id} className="list-group-item d-flex justify-content-between align-items-center">
          <span
            onClick={() => toggleComplete(todo._id, todo.completed)}
            style={{ textDecoration: todo.completed ? 'line-through' : 'none', cursor: 'pointer' }}
          >
            {todo.title}
          </span>
          <div>
            <button onClick={() => toggleComplete(todo._id, todo.completed)} className="btn btn-success btn-sm me-2">
              {todo.completed ? 'Undo' : 'Complete'}
            </button>
            <button onClick={() => deleteTodo(todo._id)} className="btn btn-danger btn-sm">
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
