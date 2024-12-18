import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) {
    return <p>Loading courses...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="px-4 py-8 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Let's Start Learning</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course._id}
            className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105"
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
                <span className="text-gray-500">No Image Available</span>
              </div>
            )}

            {/* Course Details */}
            <div className="p-4">
              <h3 className="text-lg font-semibold truncate">{course.title}</h3>
              <p className="text-sm text-gray-600 mt-1">
                By {course.instructor?.name || 'Unknown Instructor'}
              </p>
              {/* Category and Difficulty */}
              <p className="text-sm text-gray-600 mt-1">
                <strong>Category:</strong> {course.category}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                <strong>Difficulty:</strong> {course.difficulty}
              </p>
              {/* Price */}
              <div className="mt-3">
                <span className="text-xl font-semibold text-blue-600">
                  ${parseFloat(course.customPrice.$numberDecimal).toFixed(2)}{' '}
                  {course.priceUnit}
                </span>
              </div>
              {/* Enroll Button */}
              <button className="mt-4 w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                Enroll Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
