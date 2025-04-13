// Added comments to improve readability and maintainability
import React from 'react';

function TaskFilters({ filters, categories, onChange }) {
  // Handles changes in filter inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ [name]: value });
  };

  // Handles changes in sorting options
  const handleSortChange = (e) => {
    const { value } = e.target;
    const [sortBy, sortOrder] = value.split('-');
    onChange({ sortBy, sortOrder });
  };

  return (
    <div className="bg-black border border-gold p-4 rounded-lg shadow-lg mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search Input */}
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-gold mb-1">
            Search
          </label>
          <input
            type="text"
            id="search"
            name="search"
            value={filters.search}
            onChange={handleChange}
            className="w-full bg-black border border-gold/30 rounded px-3 py-2 text-gold focus:outline-none focus:border-gold"
            placeholder="Search tasks..."
          />
        </div>

        {/* Category Selector */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gold mb-1">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={filters.category}
            onChange={handleChange}
            className="w-full bg-black border border-gold/30 rounded px-3 py-2 text-gold focus:outline-none focus:border-gold"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Priority Selector */}
        <div>
          <label htmlFor="priority" className="block text-sm font-medium text-gold mb-1">
            Priority
          </label>
          <select
            id="priority"
            name="priority"
            value={filters.priority}
            onChange={handleChange}
            className="w-full bg-black border border-gold/30 rounded px-3 py-2 text-gold focus:outline-none focus:border-gold"
          >
            <option value="">All Priorities</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        {/* Status Selector */}
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gold mb-1">
            Status
          </label>
          <select
            id="status"
            name="completed"
            value={filters.completed === undefined ? '' : filters.completed.toString()}
            onChange={handleChange}
            className="w-full bg-black border border-gold/30 rounded px-3 py-2 text-gold focus:outline-none focus:border-gold"
          >
            <option value="">All Tasks</option>
            <option value="false">Active</option>
            <option value="true">Completed</option>
          </select>
        </div>

        {/* Sort Options */}
        <div className="md:col-span-2 lg:col-span-4">
          <label htmlFor="sort" className="block text-sm font-medium text-gold mb-1">
            Sort By
          </label>
          <select
            id="sort"
            value={`${filters.sortBy}-${filters.sortOrder}`}
            onChange={handleSortChange}
            className="w-full bg-black border border-gold/30 rounded px-3 py-2 text-gold focus:outline-none focus:border-gold"
          >
            <option value="createdAt-desc">Newest First</option>
            <option value="createdAt-asc">Oldest First</option>
            <option value="dueDate-asc">Due Date (Earliest)</option>
            <option value="dueDate-desc">Due Date (Latest)</option>
            <option value="priority-desc">Priority (High to Low)</option>
            <option value="priority-asc">Priority (Low to High)</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default TaskFilters;