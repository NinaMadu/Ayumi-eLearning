import React from 'react';

const Coursefilter = ({ selectedFilters, handleFilterChange }) => {
  return (
    <div className="w-1/5">
      <h4 className="font-semibold text-xl mb-4">Filter by</h4>

      <div className="mb-8">
        <h5 className="font-medium mb-2">Level</h5>
        {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
          <label key={level} className="block">
            <input
              type="checkbox"
              value={level}
              checked={selectedFilters.level.includes(level)}
              onChange={(e) => handleFilterChange(e, 'level')}
              className="mr-2"
            />
            {level}
          </label>
        ))}
      </div>

      <div className="mb-8">
        <h5 className="font-medium mb-2">Teacher</h5>
        {['Sewwandi Perera', 'John Doe'].map((teacher) => (
          <label key={teacher} className="block">
            <input
              type="checkbox"
              value={teacher}
              checked={selectedFilters.teacher.includes(teacher)}
              onChange={(e) => handleFilterChange(e, 'teacher')}
              className="mr-2"
            />
            {teacher}
          </label>
        ))}
      </div>

      <div className="mb-8">
        <h5 className="font-medium mb-2">Duration</h5>
        {['1-24 Hours', '1-4 Weeks', '3-6 Months', '1-2 Years'].map((duration) => (
          <label key={duration} className="block">
            <input
              type="checkbox"
              value={duration}
              checked={selectedFilters.duration.includes(duration)}
              onChange={(e) => handleFilterChange(e, 'duration')}
              className="mr-2"
            />
            {duration}
          </label>
        ))}
      </div>
    </div>
  );
};

export default Coursefilter;