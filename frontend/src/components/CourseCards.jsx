import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Filters from '../components/Coursefilter'; // Import Filters component
import { useSelector } from 'react-redux';





const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    level: [],
    teacher: [],
    category: [],
    duration: [],
  });
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);


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

  // Filter function
  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = selectedFilters.level.length === 0 || selectedFilters.level.includes(course.difficulty);
    const matchesTeacher = selectedFilters.teacher.length === 0 || selectedFilters.teacher.includes(course.instructor?.name);
    const matchesCategory = selectedFilters.category.length === 0 || selectedFilters.category.includes(course.category);
    const matchesDuration = selectedFilters.duration.length === 0 || selectedFilters.duration.some((duration) => {
      if (duration === "1-24 Hours") return course.customDuration >= 1 && course.customDuration <= 24 && course.durationUnit === "hours";
      if (duration === "1-4 Weeks") return course.customDuration >= 1 && course.customDuration <= 4 && course.durationUnit === "weeks";
      if (duration === "3-6 Months") return course.customDuration >= 3 && course.customDuration <= 6 && course.durationUnit === "months";
      if (duration === "1-2 Years") return course.customDuration >= 1 && course.customDuration <= 2 && course.durationUnit === "years";
      return false;
    });

    return matchesSearch && matchesLevel && matchesTeacher && matchesCategory && matchesDuration;
  });

  const handleFilterChange = (e, filterType) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    setSelectedFilters((prevFilters) => {
      const newFilters = { ...prevFilters };

      if (isChecked) {
        // Add the value to the filter
        newFilters[filterType] = [...newFilters[filterType], value];
      } else {
        // Remove the value from the filter
        newFilters[filterType] = newFilters[filterType].filter((filterValue) => filterValue !== value);
      }

      return newFilters;
    });
  };

  if (loading) return <p>Loading courses...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <div className="relative max-w-4xl mx-auto mb-8">
        <div className="flex items-center w-full border border-gray-300 rounded-full shadow-lg">
          <input
            type="text"
            placeholder="What do you want to learn?"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-2 pl-6 text-gray-700 placeholder-gray-500 rounded-full focus:outline-none"
          />
          <div className="absolute p-2 text-black rounded-full cursor-pointer right-3">
            <FaSearch className="text-xl" />
          </div>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Filter Column */}
        <Filters selectedFilters={selectedFilters} handleFilterChange={handleFilterChange} />

        {/* Courses Column */}
        <div className="w-4/5">
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 mt-8 sm:grid-cols-2 lg:grid-cols-3">
              {filteredCourses.map((course) => (
                <div
                  key={course._id}
                  className="overflow-hidden transition-transform bg-white border border-gray-200 shadow-md rounded-xl hover:shadow-lg hover:scale-105"
                  onClick={() => {
                    if (currentUser) {
                      navigate(`/user/courseIntro/${course._id}`);
                    } else { 
                       navigate(`/course/intro/${course._id}`);
                    }
                    
                  }}
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
                    <div className="mt-2 text-sm text-gray-600">
                      <strong>Duration:</strong> {course.customDuration} {course.durationUnit}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-8 text-3xl font-bold text-center text-black-500">Course not found!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Courses;