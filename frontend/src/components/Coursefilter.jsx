import React from 'react';

const CourseFilter = ({ selectedFilters, handleFilterChange }) => {
  return (
    <div className="lg:w-1/4 bg-white p-6 rounded-lg shadow-lg">
      <h4 className="font-semibold text-2xl text-gray-800 mb-4">Filter by</h4>

      {/* Level Filter */}
      <div className="mb-6">
        <h5 className="font-medium text-lg text-gray-700 mb-2">Level</h5>
        {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
          <label
            key={level}
            className="block flex items-center space-x-2 mb-2 cursor-pointer hover:bg-gray-100 px-3 py-1 rounded-md"
          >
            <input
              type="checkbox"
              value={level}
              checked={selectedFilters.level.includes(level)}
              onChange={(e) => handleFilterChange(e, 'level')}
              className="form-checkbox h-5 w-5 text-blue-500"
            />
            <span className="text-gray-600">{level}</span>
          </label>
        ))}
      </div>

      {/* Teacher Filter */}
      <div className="mb-6">
        <h5 className="font-medium text-lg text-gray-700 mb-3">Teacher</h5>
        {['Sewwandi Perera', 'John Doe'].map((teacher) => (
          <label
            key={teacher}
            className="block flex items-center space-x-2 mb-2 cursor-pointer hover:bg-gray-100 px-3 py-1 rounded-md"
          >
            <input
              type="checkbox"
              value={teacher}
              checked={selectedFilters.teacher.includes(teacher)}
              onChange={(e) => handleFilterChange(e, 'teacher')}
              className="form-checkbox h-5 w-5 text-blue-500"
            />
            <span className="text-gray-600">{teacher}</span>
          </label>
        ))}
      </div>

      {/* Duration Filter */}
      <div className="mb-6">
        <h5 className="font-medium text-lg text-gray-700 mb-3">Duration</h5>
        {['1-24 Hours', '1-4 Weeks', '3-6 Months', '1-2 Years'].map((duration) => (
          <label
            key={duration}
            className="block flex items-center space-x-2 mb-2 cursor-pointer hover:bg-gray-100 px-3 py-1 rounded-md"
          >
            <input
              type="checkbox"
              value={duration}
              checked={selectedFilters.duration.includes(duration)}
              onChange={(e) => handleFilterChange(e, 'duration')}
              className="form-checkbox h-5 w-5 text-blue-500"
            />
            <span className="text-gray-600">{duration}</span>
          </label>
        ))}
      </div>

      
    </div>
  );
};

export default CourseFilter;
