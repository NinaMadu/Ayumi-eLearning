import React, { useEffect, useState } from "react";
import { FaUsers, FaBook, FaUserPlus } from "react-icons/fa";
import AdminLayout from "../../components/AdminLayout";
import { Link } from "react-router-dom";
import { totalUsers } from "../../../../backend/controllers/user.controller";
import { totalCourses } from "../../../../backend/controllers/course.controller";

function Dashboard() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userCount, setUserCount] = useState(0);
  const [courseCount, setCourseCount] = useState(0);

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/users/count`);
        const data = await response.json();

        if (response.ok) {
          setUserCount(data.userCount); 
        } else {
          setError(data.message || 'Failed to fetch user count');
        }
      } catch (err) {
        setError('Error fetching user count');
      } finally {
        setLoading(false);
      }
    };
    fetchUserCount();
  }, []);

  useEffect(() => {
    const fetchCourseCount = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/course/count`);
        const data = await response.json();

        if (response.ok) {
          setCourseCount(data.courseCount); 
        } else {
          setError(data.message || 'Failed to fetch course count');
        }
      } catch (err) {
        setError('Error fetching course count');
      } finally {
        setLoading(false);
      }
    };
    fetchCourseCount();
  }, []);
  

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <div className="bg-gradient-to-r bg-red-200 text-black p-4 rounded-lg shadow-md h-40">
            <div className="flex flex-col items-center justify-center h-full">
              <FaUsers className="mb-2 text-4xl sm:text-4xl" />
              <div className="text-xl sm:text-2xl font-semibold">Total Users</div>
              <div className="text-xl sm:text-2xl font-bold">{userCount}</div>
            </div>
  
          </div>
          <div className="bg-gradient-to-r bg-blue-200 text-black p-4 rounded-lg shadow-md h-40">
            <div className="flex flex-col items-center justify-center h-full">
              <FaBook className="mb-2 text-2xl sm:text-3xl" />
              <div className="text-xl sm:text-xl font-semibold">Total Courses</div>
              <div className="text-xl sm:text-2xl font-bold">{courseCount}</div>
            </div>
          </div>
          <div className="bg-gradient-to-r bg-slate-200 text-black p-4 rounded-lg shadow-md h-40">
            <div className="flex flex-col items-center justify-center h-full">
              <FaUserPlus className="mb-2 text-4xl sm:text-4xl" />
              <div className="text-xl sm:text-xl font-semibold">New Enrollments</div>
              <div className="text-xl sm:text-2xl font-bold">0</div>
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
          <Link to={"/instructor/video-management-menu"} className="flex">
            <button className="w-full h-full bg-gradient-to-r bg-cyan-800 text-white font-semibold p-3 sm:p-4 rounded-lg shadow-md hover:bg-cyan-600 transition min-h-[80px]">
              Manage Lessons
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
      </div>
    </AdminLayout>
  );
}

export default Dashboard;
