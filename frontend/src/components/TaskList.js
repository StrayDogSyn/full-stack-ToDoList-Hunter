import React from 'react';
import { FaTrash, FaCheck, FaTimes } from 'react-icons/fa';
import TodoItem from './TodoItem';

const TaskList = ({ todos, toggleComplete, deleteTodo }) => {
  if (!todos.length) {
    return (
      <div className="text-center text-gray-500 py-4">
        No tasks yet. Add one to get started!
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {todos.map((todo) => (
        <TodoItem
          key={todo._id}
          todo={todo}
          toggleComplete={toggleComplete}
          deleteTodo={deleteTodo}
          data-testid={`todo-item-${todo._id}`}
        />
      ))}
    </ul>
  );
};

export default TaskList;
