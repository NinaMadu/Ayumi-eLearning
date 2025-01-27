import React, { useState } from 'react';
import { FaBook, FaTasks } from 'react-icons/fa';

const RightBar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Helper functions for the modern calendar
  const getDaysInMonth = (year, month) => {
    return new Array(31)
      .fill(null)
      .map((_, i) => new Date(year, month, i + 1))
      .filter((date) => date.getMonth() === month);
  };

  const today = new Date();
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());

  return (
    <div className="w-full lg:w-1/4 p-4 bg-white rounded-lg shadow-md">
      {/* Modern Calendar */}
      <div className="mb-6 bg-gray-50 p-4 rounded-lg shadow">
        <h3 className="mb-4 text-lg font-semibold text-blue-900">Your Calendar</h3>
        <div className="p-4 border border-gray-200 rounded-lg shadow-sm">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() =>
                setCurrentDate(
                  new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
                )
              }
              className="px-2 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
            >
              Prev
            </button>
            <h3 className="text-lg font-semibold text-gray-800">
              {currentDate.toLocaleString('default', { month: 'long' })}{' '}
              {currentDate.getFullYear()}
            </h3>
            <button
              onClick={() =>
                setCurrentDate(
                  new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
                )
              }
              className="px-2 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
            >
              Next
            </button>
          </div>

          {/* Days of the Week */}
          <div className="grid grid-cols-7 gap-2 text-center text-gray-600 font-medium">
            {daysOfWeek.map((day) => (
              <div key={day} className="uppercase text-sm">
                {day}
              </div>
            ))}
          </div>

          {/* Days in Month */}
          <div className="grid grid-cols-7 gap-2 mt-2 text-center">
            {daysInMonth.map((date) => (
              <div
                key={date.toISOString()}
                className={`p-2 rounded ${
                  date.toDateString() === today.toDateString()
                    ? 'bg-blue-500 text-white font-bold'
                    : 'bg-gray-50 text-gray-800'
                } hover:bg-blue-100`}
              >
                {date.getDate()}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming Schedule */}
      <div className="mb-6">
        <h3 className="mb-4 text-lg font-semibold text-blue-900">Upcoming Schedule</h3>
        <div className="space-y-3">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="flex items-center p-4 bg-blue-50 border border-blue-200 rounded-lg shadow-sm hover:bg-blue-100 transition"
            >
              <FaBook className="text-2xl text-blue-700 mr-4" />
              <div>
                <p className="font-medium text-gray-800">Course Name</p>
                <p className="text-sm text-gray-600">2025-10-25</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Task Progress */}
      <div>
        <h3 className="mb-4 text-lg font-semibold text-blue-900">Task Progress</h3>
        <div className="space-y-3">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="flex items-center p-4 bg-green-50 border border-green-200 rounded-lg shadow-sm hover:bg-green-100 transition"
            >
              <FaTasks className="text-2xl text-green-700 mr-4" />
              <div>
                <p className="font-medium text-gray-800">Course Name</p>
                <p className="text-sm text-gray-600">Enrolled: 2024-10-25</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RightBar;
