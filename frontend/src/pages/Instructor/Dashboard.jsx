import React, { useEffect, useState } from "react";
import { FaUsers, FaBook, FaUserPlus, FaChalkboardTeacher, FaVideo, FaTasks, FaBullhorn, FaCommentsDollar,FaFileAlt } from "react-icons/fa";
import AdminLayout from "../../components/AdminLayout";
import { Link } from "react-router-dom";

function Dashboard() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    users: 0,
    courses: 0,
    enrollments: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, coursesRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_BASE_URL}/api/users/count`),
          fetch(`${import.meta.env.VITE_API_BASE_URL}/api/course/count`)
        ]);

        const usersData = await usersRes.json();
        const coursesData = await coursesRes.json();

        if (usersRes.ok && coursesRes.ok) {
          setStats({
            users: usersData.userCount,
            courses: coursesData.courseCount,
            enrollments: 0 // Add your enrollment count logic here
          });
        } else {
          setError('Failed to fetch dashboard data');
        }
      } catch (err) {
        setError('Error fetching dashboard data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <AdminLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-red-500 text-lg">{error}</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gray-50 p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 transition-all hover:shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm mb-1">Total Users</p>
                <p className="text-3xl font-bold text-gray-800">{stats.users}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <FaUsers className="text-blue-600 text-2xl" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 transition-all hover:shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm mb-1">Total Courses</p>
                <p className="text-3xl font-bold text-gray-800">{stats.courses}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <FaBook className="text-green-600 text-2xl" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 transition-all hover:shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm mb-1">Enrollments</p>
                <p className="text-3xl font-bold text-gray-800">{stats.enrollments}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <FaUserPlus className="text-purple-600 text-2xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Management Sections */}
        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Content Management</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <ManagementCard
                icon={<FaBook className="text-blue-600 text-xl" />}
                title="Courses"
                to="/instructor/create-course"
              />
              <ManagementCard
                icon={<FaVideo className="text-green-600 text-xl" />}
                title="Lessons"
                to="/instructor/video-management-menu"
              />
              <ManagementCard
                icon={<FaTasks className="text-purple-600 text-xl" />}
                title="Assignments"
                to="/instructor/assignment-management"
              />
              <ManagementCard
                icon={<FaFileAlt className="text-yellow-600 text-xl" />}
                title="Quizzes"
                to="/instructor/create-quiz"
              />
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">User Management</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <ManagementCard
                icon={<FaUsers className="text-red-600 text-xl" />}
                title="Users"
                to="/instructor/user-management"
              />
              <ManagementCard
                icon={<FaCommentsDollar className="text-indigo-600 text-xl" />}
                title="Chats"
                to="/instructor/chat"
              />
              <ManagementCard
                icon={<FaChalkboardTeacher className="text-teal-600 text-xl" />}
                title="Payments"
                to="/instructor/payment-management"
              />
              <ManagementCard
                icon={<FaBullhorn className="text-orange-600 text-xl" />}
                title="Notices"
                to="/instructor/notice-management"
              />
            </div>
          </section>
        </div>
      </div>
    </AdminLayout>
  );
}

const ManagementCard = ({ icon, title, to }) => (
  <Link to={to} className="group">
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 transition-all hover:border-blue-200 hover:shadow-md">
      <div className="flex items-center space-x-4">
        <div className="bg-gray-100 group-hover:bg-blue-50 p-3 rounded-lg transition-colors">
          {icon}
        </div>
        <span className="font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
          {title}
        </span>
      </div>
    </div>
  </Link>
);

export default Dashboard;