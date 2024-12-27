import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(''); // Search query to filter courses
  const [searchText, setSearchText] = useState('');   // Text input value
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

  // Dynamically filter courses as search query changes
  const filteredCourses = searchQuery
    ? courses.filter(course =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : courses; // If searchQuery is empty, show all courses

  if (loading) {
    return <p>Loading courses...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <div className="relative max-w-4xl mx-auto">
        {/* Search Bar Container */}
        <div className="flex items-center border border-gray-300 rounded-full shadow-lg w-full">
          {/* Input Field */}
          <input
            type="text"
            placeholder="What do you want to learn?"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);   // Update input text
              setSearchQuery(e.target.value);  // Update search query for filtering
            }}
            className="w-full pl-6 py-2 text-gray-700 placeholder-gray-500 rounded-full focus:outline-none"
          />
          
          {/* Search Icon (Optional, can remove if not needed) */}
          <div className="absolute right-3 text-black p-2 rounded-full cursor-pointer">
            <FaSearch className="text-xl" />
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {filteredCourses.map((course) => (
          <div
            key={course._id}
            className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-transform hover:scale-105 overflow-hidden"
            onClick={() => navigate(`/user/courseIntro/${course._id}`)}
          >
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
