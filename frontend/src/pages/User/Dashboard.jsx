import React from 'react';
import UserLayout from '../../components/UserLayout';
import RightBar from '../../components/RightBar';
import { FaBook, FaCheckCircle, FaCertificate } from 'react-icons/fa';
import welcomeImage from '../../assets/welcome.jpg';

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
  } from 'recharts';


export const UDashboard = () => {
    const activityData = [
        { name: 'Mon', activity: 30 },
        { name: 'Tue', activity: 45 },
        { name: 'Wed', activity: 40 },
        { name: 'Thu', activity: 35 },
        { name: 'Fri', activity: 50 },
        { name: 'Sat', activity: 55 },
        { name: 'Sun', activity: 60 },
      ];
  return (
    <UserLayout>
      <div className="flex gap-6">
        {/* Main Dashboard Content */}
        <div className="flex-1 bg-white p-4 rounded-lg shadow">
          {/* Welcome Message */}
          <div
      className="relative mx-auto mb-6" // Add mb-6 for spacing
      style={{
        height: '200px', // Set the fixed height
        backgroundImage: `url(${welcomeImage})`, // Set the background image
        backgroundSize: 'cover', // Cover the entire division
        backgroundPosition: 'center', // Center the image
        borderRadius: '0.5rem', // Optional: rounded corners
      }}
    >
      <h2 className="text-5xl font-bold text-white text-center absolute inset-0 flex items-center justify-center">
        Welcome Back User !!!
      </h2>
    </div>

    {/* Stats Cards */}
    <div className="flex justify-around mb-6">
      <div className="bg-blue-200 p-4 rounded-lg text-center flex items-center flex-col w-1/4 shadow-md">
        <FaBook className="text-3xl text-blue-600 mb-2" />
        <p>Courses In Progress</p>
        <p className="text-2xl font-bold">10</p>
      </div>
      <div className="bg-red-200 p-4 rounded-lg text-center flex items-center flex-col w-1/4 shadow-md">
        <FaCheckCircle className="text-3xl text-red-600 mb-2" />
        <p>Courses Completed</p>
        <p className="text-2xl font-bold">10</p>
      </div>
      <div className="bg-gray-200 p-4 rounded-lg text-center flex items-center flex-col w-1/4 shadow-md">
        <FaCertificate className="text-3xl text-gray-600 mb-2" />
        <p>Certificates Earned</p>
        <p className="text-2xl font-bold">10</p>
      </div>
    </div>

          {/* Time Spending Section */}
          <div className="mb-6">
            <p className="text-xl font-semibold mb-2">Time Spending</p>
            <div className="bg-gray-100 rounded-lg p-6 shadow">
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-8">
          <div className="text-lg font-semibold mb-4">Weekly User Activity</div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={activityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="activity" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
              
            </div>
          </div>

          {/* Progress Tabs */}
          <div className="flex space-x-4 mb-4">
            <button className="bg-gray-200 px-4 py-2 rounded-lg font-semibold">In Progress</button>
            <button className="bg-gray-200 px-4 py-2 rounded-lg font-semibold">Completed</button>
          </div>

          {/* Course Progress Cards */}
          <div className="flex space-x-4">
            <div className="bg-gray-100 p-4 w-1/4 rounded-lg shadow-md text-center">
              <div className="w-full h-24 bg-gray-300 rounded-md mb-2"></div>
              <p>Course Name</p>
              <p className="text-gray-600 text-sm">90%</p>
            </div>
            <div className="bg-gray-100 p-4 w-1/4 rounded-lg shadow-md text-center">
              <div className="w-full h-24 bg-gray-300 rounded-md mb-2"></div>
              <p>Course Name</p>
              <p className="text-gray-600 text-sm">90%</p>
            </div>
            <div className="bg-gray-100 p-4 w-1/4 rounded-lg shadow-md text-center">
              <div className="w-full h-24 bg-gray-300 rounded-md mb-2"></div>
              <p>Course Name</p>
              <p className="text-gray-600 text-sm">90%</p>
            </div>
          </div>
        </div>

        {/* Right Sidebar Component */}
        <RightBar />
      </div>
    </UserLayout>
  );
};

export default UDashboard;
