import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { FaBook, FaTasks } from 'react-icons/fa';

const RightBar = () => {
  return (
    <div className="w-1/4 bg-white p-4 rounded-lg shadow-lg">
      {/* Calendar Component */}
      <div className="mb-6">
        <Calendar />
      </div>

      {/* Upcoming Schedule */}
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-4 text-blue-900">Upcoming Schedule</h3>
        <div className="bg-gray-100 p-3 rounded-lg mb-2 flex items-center">
          <FaBook className="text-xl font-semibold text-gray-700 mr-2" />
          <div>
            <p>Course Name</p>
            <p className="text-sm text-gray-600">2025-10-25</p>
          </div>
        </div>
        <div className="bg-gray-100 p-3 rounded-lg mb-2 flex items-center">
          <FaBook className="text-xl font-semibold text-gray-700 mr-2" />
          <div>
            <p>Course Name</p>
            <p className="text-sm text-gray-600">2025-10-25</p>
          </div>
        </div>
        <div className="bg-gray-100 p-3 rounded-lg flex items-center">
          <FaBook className="text-xl font-semibold text-gray-700 mr-2" />
          <div>
            <p>Course Name</p>
            <p className="text-sm text-gray-600">2025-10-25</p>
          </div>
        </div>
      </div>

      {/* Task Progress */}
      <div className="mb-4">
        <h3 className="text-lg font-bold mb-4 text-blue-900">Task Progress</h3>
        <div className="bg-gray-100 p-3 rounded-lg mb-2 flex items-center">
          <FaTasks className="text-xl text-gray-700 mr-2" />
          <div>
            <p>Course Name</p>
            <p className="text-sm text-gray-600">enrolled date: 2024-10-25</p>
          </div>
        </div>
        <div className="bg-gray-100 p-3 rounded-lg mb-2 flex items-center">
          <FaTasks className="text-xl text-gray-700 mr-2" />
          <div>
            <p>Course Name</p>
            <p className="text-sm text-gray-600">enrolled date: 2024-10-25</p>
          </div>
        </div>
        <div className="bg-gray-100 p-3 rounded-lg flex items-center">
          <FaTasks className="text-xl text-gray-700 mr-2" />
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
