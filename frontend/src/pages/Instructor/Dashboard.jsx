import React, { useState } from "react";
import { FaUsers, FaBook, FaUserPlus } from "react-icons/fa";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import AdminLayout from "../../components/AdminLayout";
import { Link } from "react-router-dom";

function Dashboard() {
  // Sample data for the charts
  const data = [
    { name: "Jan", users: 40, courses: 24, amt: 2400 },
    { name: "Feb", users: 30, courses: 13, amt: 2210 },
    { name: "Mar", users: 20, courses: 98, amt: 2290 },
    { name: "Apr", users: 27, courses: 39, amt: 2000 },
    { name: "May", users: 18, courses: 48, amt: 2181 },
    { name: "Jun", users: 23, courses: 38, amt: 2500 },
    { name: "Jul", users: 34, courses: 43, amt: 2100 },
  ];

  const pieData = [
    { name: "Paid", value: 400 },
    { name: "Free", value: 300 },
    { name: "Scholarships", value: 300 },
    { name: "Discounts", value: 200 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <div className="bg-gradient-to-r bg-red-200 text-black p-4 rounded-lg shadow-md h-40">
            <div className="flex flex-col items-center justify-center h-full">
              <FaUsers className="mb-2 text-4xl sm:text-4xl" />
              <div className="text-xl sm:text-2xl font-semibold">
                Total Users
              </div>
              <div className="text-xl sm:text-xl font-bold"></div>
            </div>
          </div>
          <div className="bg-gradient-to-r bg-blue-200 text-black p-4 rounded-lg shadow-md h-40">
            <div className="flex flex-col items-center justify-center h-full">
              <FaBook className="mb-2 text-2xl sm:text-3xl" />
              <div className="text-xl sm:text-xl font-semibold">
                Total Courses
              </div>
              <div className="text-xl sm:text-2xl font-bold">20</div>
            </div>
          </div>
          <div className="bg-gradient-to-r bg-slate-200 text-black p-4 rounded-lg shadow-md h-40">
            <div className="flex flex-col items-center justify-center h-full">
              <FaUserPlus className="mb-2 text-4xl sm:text-4xl" />
              <div className="text-xl sm:text-xl font-semibold">
                New Enrollments
              </div>
              <div className="text-xl sm:text-2xl font-bold">20</div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <Link to={"/instructor/user-management"} className="flex">
            <button className="w-full h-full bg-gradient-to-r bg-cyan-800 text-white font-semibold p-3 sm:p-4 rounded-lg shadow-md hover:bg-cyan-600 transition min-h-[80px]">
              Manage Users
            </button>
          </Link>
          <Link to={"/instructor/create-course"} className="flex">
            <button className="w-full h-full bg-gradient-to-r bg-cyan-800 text-white font-semibold p-3 sm:p-4 rounded-lg shadow-md hover:bg-cyan-600 transition min-h-[80px]">
              Manage Courses
            </button>
          </Link>
          <Link to={"/instructor/create-quiz"} className="flex">
            <button className="w-full h-full bg-gradient-to-r bg-cyan-800 text-white  font-semibold  p-3 sm:p-4 rounded-lg shadow-md hover:bg-cyan-600 transition min-h-[80px]">
              Manage Quizzes
            </button>
          </Link>
          <Link to={"/instructor/notice-management"} className="flex">
            <button className="w-full h-full bg-gradient-to-r bg-cyan-800 font-semibold text-white p-3 sm:p-4 rounded-lg shadow-md hover:bg-cyan-600 transition min-h-[80px]">
              Manage Notices
            </button>
          </Link>
          <Link to={"/instructor/payment-management"} className="flex">
            <button className="w-full h-full bg-gradient-to-r bg-cyan-800 font-semibold text-white p-3 sm:p-4 rounded-lg shadow-md hover:bg-cyan-600 transition min-h-[80px]">
              Manage Payments
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Enrollment Trends */}
          
        </div>
      </div>
    </AdminLayout>
  );
}

export default Dashboard; 
