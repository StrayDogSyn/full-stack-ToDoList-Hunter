import React from 'react';
import { FaTrash, FaCheck, FaTimes } from 'react-icons/fa';

const TodoItem = ({ todo, toggleComplete, deleteTodo, ...props }) => {
  return (
    <li
      className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
      {...props}
    >
      <div className="flex items-center space-x-3">
        <button
          onClick={() => toggleComplete(todo._id, todo.completed)}
          className={`p-2 rounded-full transition-colors duration-200 ${
            todo.completed
              ? 'bg-green-100 text-green-600 hover:bg-green-200'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
          data-testid={`toggle-${todo._id}`}
        >
          {todo.completed ? <FaCheck /> : <FaTimes />}
        </button>
        <span
          className={`text-lg ${
            todo.completed ? 'text-gray-400 line-through' : 'text-gray-700'
          }`}
          data-testid={`todo-title-${todo._id}`}
        >
          {todo.title}
        </span>
      </div>
      <button
        onClick={() => deleteTodo(todo._id)}
        className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors duration-200"
        data-testid={`delete-${todo._id}`}
      >
        <FaTrash />
      </button>
    </li>
  );
};

export default TodoItem;
