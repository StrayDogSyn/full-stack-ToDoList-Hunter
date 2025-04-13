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
    <form onSubmit={handleSubmit}>
      <h2 className="text-xl font-semibold text-gradient-primary mb-6">Create New Task</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="form-group md:col-span-2">
          <label htmlFor="title" className="block text-sm font-medium text-neutral mb-2">
            Title
          </label>
          <div className="relative">
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-secondary focus:ring-1 focus:ring-secondary text-neutral placeholder-neutral/50 transition-all"
              placeholder="What needs to be done?"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="category" className="block text-sm font-medium text-neutral mb-2">
            Category
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-secondary focus:ring-1 focus:ring-secondary text-neutral placeholder-neutral/50 transition-all"
            placeholder="e.g., personal, work, shopping"
          />
        </div>

        <div className="form-group">
          <label htmlFor="priority" className="block text-sm font-medium text-neutral mb-2">
            Priority
          </label>
          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-secondary focus:ring-1 focus:ring-secondary text-neutral transition-all"
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>
        </div>

        <div className="form-group md:col-span-2">
          <label htmlFor="description" className="block text-sm font-medium text-neutral mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-secondary focus:ring-1 focus:ring-secondary text-neutral placeholder-neutral/50 transition-all resize-none"
            placeholder="Add more details about your task..."
          />
        </div>

        <div className="form-group">
          <label htmlFor="dueDate" className="block text-sm font-medium text-neutral mb-2">
            Due Date
          </label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-secondary focus:ring-1 focus:ring-secondary text-neutral transition-all"
          />
        </div>

        <div className="form-group flex items-center space-x-3">
          <input
            type="checkbox"
            id="completed"
            name="completed"
            checked={formData.completed}
            onChange={handleChange}
            className="w-5 h-5 rounded border-white/10 text-secondary focus:ring-secondary/20 bg-white/5 transition-all"
          />
          <label htmlFor="completed" className="text-sm font-medium text-neutral select-none">
            Mark as completed
          </label>
        </div>
      </div>

      <div className="mt-6">
        <button
          type="submit"
          className="w-full px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-lg hover:shadow-glow transition-all duration-300 flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add Task
        </button>
      </div>
    </form>
  );
}

export default TaskForm;