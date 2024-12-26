import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UserLayout from '../../components/UserLayout';
import { FaStar, FaTags, FaDollarSign, FaClock } from 'react-icons/fa';

const CourseIntro = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/course/${id}`);
        const data = await res.json();

        if (res.ok) {
          setCourse(data.course);
          setLoading(false);
        } else {
          setError(data.message || 'Failed to fetch course details');
          setLoading(false);
        }
      } catch (err) {
        setError('Error fetching course details');
        setLoading(false);
      }
    };

    if (id) {
      fetchCourse();
    } else {
      setError('Course ID is missing');
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return <p className="text-center text-lg text-gray-700">Loading course details...</p>;
  }

  if (error) {
    return <p className="text-center text-lg text-red-500">{error}</p>;
  }

  if (!course) {
    return <p className="text-center text-lg text-gray-700">No course found</p>;
  }

  const instructor = course.instructor;

  return (
    <UserLayout>
      <div className="w-full mb-4">
        <h2 className="text-4xl font-bold mb-4 text-gray-900 text-center">{course.title}</h2>

        <div className="w-full">
          {course.introImage ? (
            <img
              src={course.introImage}
              alt={course.title}
              className="w-full h-96 object-cover rounded-lg shadow-md"
            />
          ) : (
            <div className="w-full h-96 bg-gray-300 flex items-center justify-center rounded-lg">
              <span className="text-gray-500">No Image Available</span>
            </div>
          )}
        </div>
      </div>

      <div>
        <p className="text-lg font-semibold text-gray-700 text-center">{course.description}</p>
      </div>

      <div className="px-4 py-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row">
          {/* Left Section */}
          <div className="md:w-1/2">
            {/* Instructor Details */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">Meet Your Instructor</h3>
              {instructor ? (
                <div className="flex items-center space-x-4">
                  {instructor.avatar ? (
                    <img
                      src={instructor.avatar}
                      alt={instructor.name}
                      className="w-16 h-16 object-cover rounded-full"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gray-300 flex items-center justify-center rounded-full">
                      <span className="text-gray-500">No Image</span>
                    </div>
                  )}
                  <div>
                    <p className="text-lg font-medium text-gray-900">{instructor.name || 'Unknown Instructor'}</p>
                    <p className="text-gray-600">{instructor.bio || 'No bio available'}</p>
                    <p className="text-gray-600">
                      {instructor.experience && instructor.experience.length > 0
                        ? `Experience: ${instructor.experience.join(', ')}`
                        : 'No experience listed'}
                    </p>
                    <p className="text-gray-600">
                      {instructor.qualifications && instructor.qualifications.length > 0
                        ? `Qualifications: ${instructor.qualifications.join(', ')}`
                        : 'No qualifications listed'}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-gray-700">Loading instructor details...</p>
              )}
            </div>

            {/* What You'll Learn */}
            <div className="bg-white p-6 rounded-lg shadow-md mt-8">
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">What You'll Learn</h3>
              <ul className="list-disc list-inside pl-4 space-y-2">
                {course.objectives && course.objectives.map((objective, index) => (
                  <li key={index} className="text-gray-700">{objective}</li>
                ))}
              </ul>
            </div>

            {/* What You Need to Know */}
            <div className="bg-white p-6 rounded-lg shadow-md mt-8">
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">What You Need to Know</h3>
              <ul className="list-disc list-inside pl-4 space-y-2">
                {course.prerequisites && course.prerequisites.map((prerequisite, index) => (
                  <li key={index} className="text-gray-700">{prerequisite}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Section */}
          <div className="md:w-1/2 md:pl-8 mt-8 md:mt-0">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-center">
                <FaTags className="text-blue-600" />
                <p className="text-lg text-gray-700 "><strong>Category of the course:</strong> {course.category}</p>
              </div>

              <div className="flex items-center space-x-2 text-center">
                <FaStar className="text-yellow-500" />
                <p className="text-lg text-gray-700"><strong>Difficulty level:</strong> {course.difficulty}</p>
              </div>

              {/* New addition for course duration */}
              <div className="flex items-center space-x-2 text-center">
                <FaClock className="text-blue-600" />
                <p className="text-lg text-gray-700"><strong>Duration of the course:</strong> {course.customDuration} {course.durationUnit}</p>
              </div>

              {/* Enrollment Option */}
              <div className="flex items-center space-x-6 mt-8 text-center">
                <div
                  className={`flex items-center p-2 rounded-lg shadow-lg transition-transform transform hover:scale-105 cursor-pointer ${course.enrollmentOptions === 'free' ? 'bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-black' : 'bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-black w-full'}`}
                  onClick={() => console.log(`${course.enrollmentOptions === 'free' ? 'Free' : 'Paid'} enrollment clicked`)}
                >
                  <div className="flex items-center w-full">
                    <p className="text-[16px] font-semibold w-full text-center">
                      {course.enrollmentOptions === 'free' ? (
                        <span className="font-bold">Free Course</span>
                      ) : (<><span className="font-bold">Paid Course</span>- {parseFloat(course.customPrice.$numberDecimal).toFixed(2)} {course.priceUnit}</>
                        

                      )}
                    </p>
                  </div>
                </div>
              </div>

              <button className="mt-8 w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                Enroll Now
              </button>
            </div>

            {/* Statistical Ratings and Reviews */}
            <div className="mt-10">
              {/* Average Rating */}
              <div className="flex items-center space-x-2 text-center">
                <FaStar className="text-yellow-500" />
                <p className="text-lg text-gray-700">
                  <strong>Average Rating:</strong> 4.5 / 5
                </p>
              </div>

              {/* Star Rating UI */}
              <div className="flex items-center space-x-1 mt-4">
                <FaStar className="text-yellow-500" />
                <FaStar className="text-yellow-500" />
                <FaStar className="text-yellow-500" />
                <FaStar className="text-yellow-500" />
                <FaStar className="text-gray-300" /> {/* Empty star for the 5th rating */}
              </div>

              {/* Sample Reviews */}
              <div className="mt-6">
                <h3 className="text-2xl font-semibold text-gray-900">What Students Are Saying...</h3>

                <div className="bg-white p-4 mt-4 rounded-lg shadow-md">
                  <p className="text-gray-700 italic">"This course exceeded my expectations! The content was well-structured, and the instructor was highly knowledgeable."</p>
                  <p className="text-gray-600 mt-2">- Student 1</p>
                </div>

               
              </div>
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default CourseIntro;
