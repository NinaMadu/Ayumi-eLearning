import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../../components/AdminLayout';

const VideoManagementMenu = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/course`);
        const data = await res.json();

        if (res.ok) {
          setCourses(data.courses);
          setLoading(false);
        } else {
          setError(data.message || 'Failed to fetch courses');
          setLoading(false);
        }
      } catch (err) {
        setError('Error fetching courses');
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) return <p>Loading courses...</p>;
  if (error) return <p>{error}</p>;

  return (
    <AdminLayout>
      <div className="px-4 py-8 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Video Management</h1>
        <ul className="space-y-4">
          {courses.map((course) => (
            <li
              key={course._id}
              className="flex items-center bg-white border border-gray-200 rounded-lg shadow p-4 cursor-pointer hover:bg-gray-100"
              onClick={() => navigate(`/instructor/course-video-list/${course._id}`)}
            >
              {course.introImage ? (
                <img
                  src={course.introImage}
                  alt={course.title}
                  className="w-16 h-16 object-cover rounded-md mr-4"
                />
              ) : (
                <div className="w-16 h-16 bg-gray-300 flex items-center justify-center rounded-md mr-4">
                  <svg
                    className="w-8 h-8 text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 16s-1 0-1-1 1-4 6-4 6 4 6 4 1 0 1-1-1-4-6-4-6 4-6 4z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6.253V6c0-1.104.896-2 2-2h1.764C17.533 4 18 4.567 18 5.364V8"
                    />
                  </svg>
                </div>
              )}
              <span className="text-lg font-medium text-gray-800">{course.title}</span>
            </li>
          ))}
        </ul>
      </div>
    </AdminLayout>
  );
};

export default VideoManagementMenu;
