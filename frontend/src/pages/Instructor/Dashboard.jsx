import React, { useEffect, useState } from "react";
import { FaUsers, FaBook, FaUserPlus, FaChalkboardTeacher, FaVideo, FaTasks, FaBullhorn, FaCommentsDollar,FaFileAlt } from "react-icons/fa";
import AdminLayout from "../../components/AdminLayout";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Notification from "../../components/Notification";

function Dashboard() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    users: 0,
    courses: 0,
    enrollments: 0
  });

  const location = useLocation();
  const [showNotification, setShowNotification] = useState(false);
  const [message, setMessage] = useState("");


  useEffect(() => {

    if(location.state && location.state.successMessage) {
      setMessage(location.state.successMessage);
      setShowNotification(true);

      window.history.replaceState({}, document.title);
    }


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
        <div className="flex items-center justify-center min-h-screen">
          <div className="w-12 h-12 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-lg text-red-500">{error}</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      
      <div className="min-h-screen p-6 bg-gray-50">
        {
        showNotification && (
           <Notification
                type="success"
                message={message}
                onClose={() => setShowNotification(false)}
              />
        )
      }
        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-3">
          <div className="p-6 transition-all bg-white border border-gray-200 shadow-sm rounded-xl hover:shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="mb-1 text-sm text-gray-500">Total Users</p>
                <p className="text-3xl font-bold text-gray-800">{stats.users}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <FaUsers className="text-2xl text-blue-600" />
              </div>
            </div>
          </div>

          <div className="p-6 transition-all bg-white border border-gray-200 shadow-sm rounded-xl hover:shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="mb-1 text-sm text-gray-500">Total Courses</p>
                <p className="text-3xl font-bold text-gray-800">{stats.courses}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <FaBook className="text-2xl text-green-600" />
              </div>
            </div>
          </div>

          <div className="p-6 transition-all bg-white border border-gray-200 shadow-sm rounded-xl hover:shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="mb-1 text-sm text-gray-500">Enrollments</p>
                <p className="text-3xl font-bold text-gray-800">{stats.enrollments}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <FaUserPlus className="text-2xl text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Management Sections */}
        <div className="space-y-6">
          <section>
            <h2 className="mb-4 text-xl font-semibold text-gray-800">Content Management</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <ManagementCard
                icon={<FaBook className="text-xl text-blue-600" />}
                title="Courses"
                to="/instructor/create-course"
              />
              <ManagementCard
                icon={<FaVideo className="text-xl text-green-600" />}
                title="Lessons"
                to="/instructor/video-management-menu"
              />
              <ManagementCard
                icon={<FaTasks className="text-xl text-purple-600" />}
                title="Assignments"
                to="/instructor/assignment-management"
              />
              <ManagementCard
                icon={<FaFileAlt className="text-xl text-yellow-600" />}
                title="Quizzes"
                to="/instructor/create-quiz"
              />
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold text-gray-800">User Management</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <ManagementCard
                icon={<FaUsers className="text-xl text-red-600" />}
                title="Users"
                to="/instructor/user-management"
              />
              <ManagementCard
                icon={<FaCommentsDollar className="text-xl text-indigo-600" />}
                title="Chats"
                to="/instructor/chat"
              />
              <ManagementCard
                icon={<FaChalkboardTeacher className="text-xl text-teal-600" />}
                title="Payments"
                to="/instructor/payment-management"
              />
              <ManagementCard
                icon={<FaBullhorn className="text-xl text-orange-600" />}
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
    <div className="p-6 transition-all bg-white border border-gray-200 shadow-sm rounded-xl hover:border-blue-200 hover:shadow-md">
      <div className="flex items-center space-x-4">
        <div className="p-3 transition-colors bg-gray-100 rounded-lg group-hover:bg-blue-50">
          {icon}
        </div>
        <span className="font-medium text-gray-700 transition-colors group-hover:text-blue-600">
          {title}
        </span>
      </div>
    </div>
  </Link>
);

export default Dashboard;