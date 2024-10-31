import React from 'react';
import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
import { FaBook, FaTasks } from 'react-icons/fa';

const RightBar = () => {
  return (
    <div className="w-1/4 p-4 bg-white rounded-lg shadow-lg">
      {/* Calendar Component */}
      <div className="mb-6">
        <Calendar />
      </div>

      {/* Upcoming Schedule */}
      <div className="mb-6">
        <h3 className="mb-4 text-lg font-bold text-blue-900">Upcoming Schedule</h3>
        <div className="flex items-center p-3 mb-2 bg-gray-100 rounded-lg">
          <FaBook className="mr-2 text-xl font-semibold text-gray-700" />
          <div>
            <p>Course Name</p>
            <p className="text-sm text-gray-600">2025-10-25</p>
          </div>
        </div>
        <div className="flex items-center p-3 mb-2 bg-gray-100 rounded-lg">
          <FaBook className="mr-2 text-xl font-semibold text-gray-700" />
          <div>
            <p>Course Name</p>
            <p className="text-sm text-gray-600">2025-10-25</p>
          </div>
        </div>
        <div className="flex items-center p-3 bg-gray-100 rounded-lg">
          <FaBook className="mr-2 text-xl font-semibold text-gray-700" />
          <div>
            <p>Course Name</p>
            <p className="text-sm text-gray-600">2025-10-25</p>
          </div>
        </div>
      </div>

      {/* Task Progress */}
      <div className="mb-4">
        <h3 className="mb-4 text-lg font-bold text-blue-900">Task Progress</h3>
        <div className="flex items-center p-3 mb-2 bg-gray-100 rounded-lg">
          <FaTasks className="mr-2 text-xl text-gray-700" />
          <div>
            <p>Course Name</p>
            <p className="text-sm text-gray-600">enrolled date: 2024-10-25</p>
          </div>
        </div>
        <div className="flex items-center p-3 mb-2 bg-gray-100 rounded-lg">
          <FaTasks className="mr-2 text-xl text-gray-700" />
          <div>
            <p>Course Name</p>
            <p className="text-sm text-gray-600">enrolled date: 2024-10-25</p>
          </div>
        </div>
        <div className="flex items-center p-3 bg-gray-100 rounded-lg">
          <FaTasks className="mr-2 text-xl text-gray-700" />
          <div>
            <p>Course Name</p>
            <p className="text-sm text-gray-600">enrolled date: 2024-10-25</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightBar;
