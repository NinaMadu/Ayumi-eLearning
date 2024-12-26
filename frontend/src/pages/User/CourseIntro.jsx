import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UserLayout from '../../components/UserLayout';

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
    return <p>Loading course details...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!course) {
    return <p>No course found</p>;
  }

  // Access instructor data from the course object
  const instructor = course.instructor;

  return (
    <div>
      <UserLayout>
    <div className="px-4 py-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-2/3">
          <h2 className="text-4xl font-bold mb-4">{course.title}</h2>
          {/* Course image and other details */}
          <div className="mb-4">
            {course.introImage ? (
              <img
                src={course.introImage}
                alt={course.title}
                className="w-full h-64 object-cover rounded-lg shadow-md"
              />
            ) : (
              <div className="w-full h-64 bg-gray-300 flex items-center justify-center rounded-lg shadow-md">
                <span className="text-gray-500">No Image Available</span>
              </div>
            )}
          </div>
          <div className="space-y-4">
            <p className="text-lg text-gray-700"><strong>Description:</strong> {course.description}</p>
            <p className="text-lg text-gray-700"><strong>Category:</strong> {course.category}</p>
            <p className="text-lg text-gray-700"><strong>Difficulty:</strong> {course.difficulty}</p>
            <p className="text-lg text-gray-700">
              <strong>Enrollment:</strong> 
              {course.enrollmentOptions === 'free' 
                ? 'Free' 
                : `Paid`}
            </p>
            <p className="text-lg text-gray-700"><strong>Price:</strong> {course.isFree ? 'Free' : `$${parseFloat(course.customPrice.$numberDecimal).toFixed(2)} ${course.priceUnit}`}</p>
          </div>
        </div>

        {/* Course Overview, Instructor, Prerequisites sections */}
        <div className="md:w-1/3 md:pl-8 mt-8 md:mt-0">
          {/* Course Overview */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-4">Course Overview</h3>
            <ul className="list-disc list-inside pl-4 space-y-2">
              {course.objectives && course.objectives.map((objective, index) => (
                <li key={index} className="text-gray-700">{objective}</li>
              ))}
            </ul>
            <button className="mt-6 w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Enroll Now
            </button>
          </div>

          {/* Instructor Info */}
          <div className="bg-white p-6 rounded-lg shadow-md mt-8">
            <h3 className="text-2xl font-semibold mb-4">Instructor</h3>
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
                  <p className="text-lg font-medium">By {instructor.name || 'Unknown Instructor'}</p>
                  <p className="text-gray-600">{instructor.bio || 'No bio available'}</p>
                  <p className="text-gray-600">{instructor.experience && instructor.experience.length > 0 ? `Experience: ${instructor.experience.join(', ')}` : 'No experience listed'}</p>
                  <p className="text-gray-600">{instructor.qualifications && instructor.qualifications.length > 0 ? `Qualifications: ${instructor.qualifications.join(', ')}` : 'No qualifications listed'}</p>
                </div>
              </div>
            ) : (
              <p>Loading instructor details...</p>
            )}
          </div>

          {/* Prerequisites */}
          <div className="bg-white p-6 rounded-lg shadow-md mt-8">
            <h3 className="text-2xl font-semibold mb-4">Prerequisites</h3>
            <ul className="list-disc list-inside pl-4 space-y-2">
              {course.prerequisites && course.prerequisites.map((prerequisite, index) => (
                <li key={index} className="text-gray-700">{prerequisite}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
    </UserLayout>
    </div>
  );
};

export default CourseIntro;
