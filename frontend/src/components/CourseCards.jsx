import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Courses = ({ isAdmin }) => {
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

  const handleDelete = async (courseId) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/course/${courseId}`, {
          method: 'DELETE',
        });
        if (res.ok) {
          setCourses((prevCourses) => prevCourses.filter((course) => course._id !== courseId));
          alert('Course deleted successfully');
        } else {
          const data = await res.json();
          alert(data.message || 'Failed to delete course');
        }
      } catch (error) {
        alert('Error deleting course');
      }
    }
  };

  if (loading) return <p>Loading courses...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="px-4 py-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course) => (
          <div
            key={course._id}
            className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-transform hover:scale-105 overflow-hidden"
          >
            {/* Course Image */}
            {course.introImage ? (
              <img
                src={course.introImage}
                alt={course.title}
                className="w-full h-48 object-cover"
              />
            ) : (
              <div className="w-full h-48 bg-gray-300 flex items-center justify-center">
                <svg
                  className="w-16 h-16 text-gray-500"
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

            {/* Course Details */}
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 truncate">{course.title}</h3>
              <p className="text-sm text-gray-500 mt-2">
                By {course.instructor?.name || 'Unknown Instructor'}
              </p>
              <div className="flex justify-between items-center mt-4">
                <div className="text-sm text-gray-600">
                  <strong>Category:</strong> {course.category}
                </div>
                <div className="text-sm text-gray-600">
                  <strong>Difficulty:</strong> {course.difficulty}
                </div>
              </div>
              {isAdmin && (
                <div className="mt-4 flex justify-between">
                  <button
                    className="text-sm text-white bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-600"
                    onClick={() => navigate(`/instructor/edit-course-first/${course._id}`)}
                  >
                    Edit
                  </button>

                  <button
                    className="text-sm text-white bg-red-500 px-4 py-2 rounded-md hover:bg-red-600"
                    onClick={() => handleDelete(course._id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
