import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserLayout from "../../components/UserLayout";
import { useSelector } from 'react-redux';
import Discussion from "../../components/Discussion.jsx";

const DiscussionsPage = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourseId, setSelectedCourseId] = useState(null);

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/users/user/${currentUser._id}/enrolled-courses`
        );
        setEnrolledCourses(response.data.enrolledCourses || []);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrolledCourses();
  }, [currentUser]);

  if (loading) return <p>Loading enrolled courses...</p>;

  return (
    <UserLayout>
      <div className="p-4">
        <h2 className="text-2xl font-semibold mb-4 text-center">Course Discussions</h2>

        <div className="grid grid-cols-1 gap-4">
          {enrolledCourses.map((course) => (
            <div
              key={course._id}
              className="border rounded shadow"
            >
              <div
                onClick={() =>
                  setSelectedCourseId(selectedCourseId === course._id ? null : course._id)
                }
                className="flex items-center gap-4 p-4 cursor-pointer hover:bg-gray-100 transition-all"
              >
                <img
                  src={course.introImage}
                  alt={course.title}
                  className="w-20 h-20 object-cover rounded"
                />
                <div>
                  <h3 className="text-xl font-medium">{course.title}</h3>
                </div>
              </div>

              {/* Show discussion under this course if selected */}
              {selectedCourseId === course._id && (
                <div className="border-t p-4 bg-gray-50">
                  <Discussion courseId={course._id} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </UserLayout>
  );
};

export default DiscussionsPage;
