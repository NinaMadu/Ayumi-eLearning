import React from 'react';

const Coursefilter = ({ onFilterChange }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-8">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Filter Courses</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2" htmlFor="category">
            Category
          </label>
          <select
            id="category"
            className="block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
            onChange={(e) => onFilterChange('category', e.target.value)}
          >
            <option value="">All</option>
            <option value="Technology">Technology</option>
            <option value="Business">Business</option>
            <option value="Art">Art</option>
            <option value="Science">Science</option>
          </select>
        </div>

        {/* Difficulty Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2" htmlFor="difficulty">
            Difficulty
          </label>
          <select
            id="difficulty"
            className="block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
            onChange={(e) => onFilterChange('difficulty', e.target.value)}
          >
            <option value="">All</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        {/* Price Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2" htmlFor="priceRange">
            Price Range
          </label>
          <input
            type="range"
            id="priceRange"
            min="0"
            max="100"
            className="w-full"
            onChange={(e) => onFilterChange('price', e.target.value)}
          />
          <span className="block text-sm text-gray-600 mt-1">Up to ${e.target.value || 100}</span>
        </div>
      </div>
    </div>
  );
};

export default Coursefilter;
