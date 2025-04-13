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

  const handleSubmit = (e) => {
    e.preventDefault();
    const normalizedData = {
      ...formData,
      priority: formData.priority.toLowerCase(),
      category: formData.category.toLowerCase() || 'personal'
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="card shimmer-border">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Title Input */}
        <div className="form-group md:col-span-2">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="input"
            placeholder="What needs to be done?"
          />
        </div>

        {/* Category Input */}
        <div className="form-group">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="input"
            placeholder="e.g., personal, work, shopping"
          />
        </div>

        {/* Priority Select */}
        <div className="form-group">
          <label htmlFor="priority" className="form-label">
            Priority
          </label>
          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="input"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        {/* Description Textarea */}
        <div className="form-group md:col-span-2">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="input"
            placeholder="Add more details about your task..."
          />
        </div>

        {/* Due Date Input */}
        <div className="form-group">
          <label htmlFor="dueDate" className="form-label">
            Due Date
          </label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className="input"
          />
        </div>

        {/* Completed Checkbox */}
        <div className="form-group flex items-center space-x-2">
          <input
            type="checkbox"
            id="completed"
            name="completed"
            checked={formData.completed}
            onChange={handleChange}
            className="h-5 w-5 rounded border-gold/30 text-gold focus:ring-gold/20 bg-black"
          />
          <label htmlFor="completed" className="form-label mb-0">
            Mark as completed
          </label>
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-6">
        <button type="submit" className="btn btn-primary w-full">
          Add Task
        </button>
      </div>
    </form>
  );
}

export default TaskForm;