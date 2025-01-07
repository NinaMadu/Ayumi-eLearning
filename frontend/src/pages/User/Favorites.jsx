import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import User from '../../../../backend/models/user.model';
import UserLayout from '../../components/UserLayout';

const FavoriteCourses = () => {

  const currentUser = useSelector((state)=>state.user.currentUser);  
  const [favoriteCourses, setFavoriteCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(''); // Search query to filter courses
  const [searchText, setSearchText] = useState('');   // Text input value
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavoriteCourses = async () => {
      try {
        // Fetch the user's favorite courses
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/users/user/${currentUser._id}/favorites`);
        const data = await res.json();

        if (res.ok) {
          setFavoriteCourses(data.favorities || []);
          setLoading(false);
        } else {
          setError(data.message || 'Failed to fetch favorite courses');
          setLoading(false);
        }
      } catch (err) {
        setError('Error fetching favorite courses');
        setLoading(false);
      }
    };

    fetchFavoriteCourses();
  }, []);

  // Dynamically filter courses as search query changes
  const filteredCourses = searchQuery
    ? favoriteCourses.filter(course =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : favoriteCourses; // If searchQuery is empty, show all courses

  if (loading) {
    return <p>Loading favorite courses...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <UserLayout>
      <div className="relative max-w-4xl mx-auto">
        {/* Search Bar Container */}
        <div className="flex items-center w-full border border-gray-300 rounded-full shadow-lg">
          {/* Input Field */}
          <input
            type="text"
            placeholder="Search favorite courses..."
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);   // Update input text
              setSearchQuery(e.target.value);  // Update search query for filtering
            }}
            className="w-full py-2 pl-6 text-gray-700 placeholder-gray-500 rounded-full focus:outline-none"
          />
          <div className="absolute p-2 text-black rounded-full cursor-pointer right-3">
            <FaSearch className="text-xl" />
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 mt-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course) => (
            <div
              key={course._id}
              className="overflow-hidden transition-transform bg-white border border-gray-200 shadow-md rounded-xl hover:shadow-lg hover:scale-105"
              onClick={() => navigate(`/user/courseIntro/${course._id}`)}
            >
              {course.introImage ? (
                <img
                  src={course.introImage}
                  alt={course.title}
                  className="object-cover w-full h-48"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-48 bg-gray-300">
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
                <p className="mt-2 text-sm text-gray-500">
                  By {course.instructor?.name || 'Unknown Instructor'}
                </p>
                <div className="flex items-center justify-between mt-4">
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
      ) : (
        <p className="mt-8 text-3xl font-bold text-center text-black-500">No favorite courses found!</p>
      )}
      </UserLayout>  
    </div>
  );
};

export default FavoriteCourses;
