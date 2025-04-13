import React from 'react';

function TaskFilters({ filters, categories, onChange }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ [name]: value });
  };

  const handleSortChange = (e) => {
    const [sortBy, sortOrder] = e.target.value.split('-');
    onChange({ sortBy, sortOrder });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-gradient-primary mb-6">Filter Tasks</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Search Input */}
        <div className="form-group lg:col-span-2">
          <label htmlFor="search" className="block text-sm font-medium text-neutral mb-2">
            Search Tasks
          </label>
          <div className="relative">
            <input
              type="text"
              id="search"
              name="search"
              value={filters.search}
              onChange={handleChange}
              placeholder="Search by title or description..."
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-secondary focus:ring-1 focus:ring-secondary text-neutral placeholder-neutral/50 transition-all"
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral/50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Category Selector */}
        <div className="form-group">
          <label htmlFor="category" className="block text-sm font-medium text-neutral mb-2">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={filters.category}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-secondary focus:ring-1 focus:ring-secondary text-neutral transition-all"
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
        <div className="form-group">
          <label htmlFor="priority" className="block text-sm font-medium text-neutral mb-2">
            Priority
          </label>
          <select
            id="priority"
            name="priority"
            value={filters.priority}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-secondary focus:ring-1 focus:ring-secondary text-neutral transition-all"
          >
            <option value="">All Priorities</option>
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>
        </div>

        {/* Status Selector */}
        <div className="form-group">
          <label htmlFor="status" className="block text-sm font-medium text-neutral mb-2">
            Status
          </label>
          <select
            id="status"
            name="completed"
            value={filters.completed === undefined ? '' : filters.completed.toString()}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-secondary focus:ring-1 focus:ring-secondary text-neutral transition-all"
          >
            <option value="">All Tasks</option>
            <option value="false">Active</option>
            <option value="true">Completed</option>
          </select>
        </div>

        {/* Sort Options */}
        <div className="form-group lg:col-span-4">
          <label htmlFor="sort" className="block text-sm font-medium text-neutral mb-2">
            Sort By
          </label>
          <select
            id="sort"
            value={`${filters.sortBy}-${filters.sortOrder}`}
            onChange={handleSortChange}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-secondary focus:ring-1 focus:ring-secondary text-neutral transition-all"
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