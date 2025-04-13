// Added comments to improve readability and maintainability
import React, { useState } from 'react';

function TaskForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    priority: 'medium',
    dueDate: '',
    completed: false
  });

  // Handles form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Normalize the priority to lowercase before submitting
    const normalizedData = {
      ...formData,
      priority: formData.priority.toLowerCase(),
      category: formData.category.toLowerCase() || 'personal' // Provide default category
    };
    onSubmit(normalizedData);
    setFormData({
      title: '',
      description: '',
      category: '',
      priority: 'medium',
      dueDate: '',
      completed: false
    });
  };

  // Handles input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-black border border-gold p-6 rounded-lg shadow-lg mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Title Input */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gold mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full bg-black border border-gold/30 rounded px-3 py-2 text-gold focus:outline-none focus:border-gold"
            placeholder="Enter task title"
          />
        </div>

        {/* Category Input */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gold mb-1">
            Category
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full bg-black border border-gold/30 rounded px-3 py-2 text-gold focus:outline-none focus:border-gold"
            placeholder="Enter category"
          />
        </div>

        {/* Description Input */}
        <div className="md:col-span-2">
          <label htmlFor="description" className="block text-sm font-medium text-gold mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="w-full bg-black border border-gold/30 rounded px-3 py-2 text-gold focus:outline-none focus:border-gold"
            placeholder="Enter task description"
          />
        </div>

        {/* Priority Selector */}
        <div>
          <label htmlFor="priority" className="block text-sm font-medium text-gold mb-1">
            Priority
          </label>
          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full bg-black border border-gold/30 rounded px-3 py-2 text-gold focus:outline-none focus:border-gold"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        {/* Due Date Input */}
        <div>
          <label htmlFor="dueDate" className="block text-sm font-medium text-gold mb-1">
            Due Date
          </label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className="w-full bg-black border border-gold/30 rounded px-3 py-2 text-gold focus:outline-none focus:border-gold"
          />
        </div>

        {/* Completed Checkbox */}
        <div className="md:col-span-2 flex items-center">
          <input
            type="checkbox"
            id="completed"
            name="completed"
            checked={formData.completed}
            onChange={handleChange}
            className="h-4 w-4 text-gold border-gold/30 rounded focus:ring-gold"
          />
          <label htmlFor="completed" className="ml-2 text-sm font-medium text-gold">
            Mark as completed
          </label>
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-6">
        <button
          type="submit"
          className="w-full bg-gold text-black font-semibold py-2 px-4 rounded hover:bg-gold-dark transition-colors"
        >
          Add Task
        </button>
      </div>
    </form>
  );
}

export default TaskForm;