import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import {
  FaArrowAltCircleDown,
  FaRegArrowAltCircleDown,
  FaPlayCircle,
} from "react-icons/fa";
import {
  FaStar,
  FaRegStar,
  FaCheckCircle,
  FaClock,
  FaLanguage,
} from "react-icons/fa";

import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const CourseContent = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);
  const [course, setCourse] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("courseMaterials");
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!courseId) {
      setError("Course ID is missing in the URL");
      setLoading(false);
      return;
    }

    const fetchCourseData = async () => {
      try {
        const [courseRes, videosRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/api/course/${courseId}`),
          axios.get(`${API_BASE_URL}/api/courses/${courseId}/videos`),
        ]);
        setCourse(courseRes.data.course);
        setVideos(videosRes.data.videos);
      } catch (err) {
        setError("Error fetching course details or videos");
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [courseId]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="bg-gray-50 py-20 min-h-screen font-sans">
      <Header />
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-1/4 text-black font-semibold p-6 shadow-xl bg-white rounded-xl">
          <h2 className="text-2xl font-bold mb-8 text-blue-800">
            Course Content
          </h2>
          <ul className="space-y-8">
            {["courseMaterials", "notes", "messages", "courseInfo"].map(
              (category) => (
                <li
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  className={`cursor-pointer hover:text-blue-800 transition-all duration-200 shadow-md p-2 rounded-lg ${
                    selectedCategory === category ? "text-blue-800" : ""
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </li>
              )
            )}
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-white p-8 shadow-inner rounded-xl overflow-auto">
          {loading && <p className="text-center text-gray-600">Loading...</p>}
          {error && <p className="text-center text-red-500">{error}</p>}

          {selectedCategory === "courseMaterials" && course && (
            <div>
              <div className="text-black bg-slate-100 p-6 rounded-lg mb-6 shadow-lg">
                <h1 className="text-3xl font-extrabold text-blue-800">
                  {course.title}
                </h1>
                <p className="mt-2 text-md text-gray-600">
                  {course.description}
                </p>
              </div>

              <button
                onClick={() => setExpanded(!expanded)}
                className="flex items-center px-6 py-3 text-slate-700 rounded-lg shadow hover:bg-slate-300 transition-all duration-200 focus:outline-none"
              >
                {expanded ? (
                  <FaArrowAltCircleDown className="mr-2 transform rotate-180 transition-transform duration-200" />
                ) : (
                  <FaRegArrowAltCircleDown className="mr-2 transform rotate-0 transition-transform duration-200" />
                )}
                {expanded
                  ? "Hide Learning Objectives"
                  : "Show Learning Objectives"}
              </button>

              {expanded &&
                Array.isArray(course.objectives) &&
                course.objectives.length > 0 && (
                  <ul className="mt-6 space-y-3 text-gray-700">
                    <h3 className="text-xl font-semibold text-blue-700">
                      Learning Objectives
                    </h3>
                    {course.objectives.map((objective, index) => (
                      <li key={index} className="text-md">
                        {objective}
                      </li>
                    ))}
                  </ul>
                )}

              {videos.length > 0 ? (
                <div className="flex flex-col gap-6 mt-6">
                  {videos.map((video) => (
                    <div
                      key={video._id}
                      className="bg-white rounded-lg shadow-sm"
                    >
                      <div className="p-4 flex gap-2">
                        <FaPlayCircle
                          className="mr-2 transform rotate-180 transition-transform duration-200 hover:text-blue-600 cursor-pointer"
                          onClick={() =>
                            navigate(
                              `/instructor/videoPreview/${video.videoId}`
                            )
                          }
                        />
                        <h3
                          className="text-lg text-gray-800 font-semibold hover:bg-slate-50 cursor-pointer"
                          onClick={() =>
                            navigate(
                              `/instructor/videoPreview/${video.videoId}`
                            )
                          }
                        >
                          {video.title}
                        </h3>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-600">
                  No videos available.
                </p>
              )}
            </div>
          )}

          {selectedCategory === "courseInfo" && course && (
            <div>
              <h2 className="font-semibold text-xl pb-4">About this Course</h2>
              <p>{course.description}</p>

              {course.instructor && (
                <div className="mt-6 gap-8 items-center">
                  <div></div>
                  <h3 className="text-lg font-semibold mb-4 text-gray-900">
                    Taught by:
                  </h3>
                  <div className="flex items-center space-x-4 mb-6">
                    {course.instructor.avatar ? (
                      <img
                        src={course.instructor.avatar}
                        alt={course.instructor.name}
                        className="w-16 h-16 object-cover rounded-full"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gray-300 flex items-center justify-center rounded-full">
                        <span className="text-gray-500">No Image</span>
                      </div>
                    )}
                    <div>
                      <p className="text-lg font-medium text-gray-900">
                        {course.instructor.name || "Unknown Instructor"}
                      </p>

                      <p className="text-gray-600">
                        {course.instructor.experience?.join(", ") ||
                          "No experience listed"}
                      </p>
                    </div>
                  </div>
                  <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                    <tbody>
                      {/* Level */}
                      <tr className="border-b border-gray-200">
                        <td className="flex items-center p-4 text-gray-700 space-x-2">
                          <FaCheckCircle className="text-blue-500" />
                          <span className="font-semibold">Level</span>
                        </td>
                        <td className="p-4 text-gray-600">
                          {course.difficulty}
                        </td>
                      </tr>

                      {/* Commitment */}
                      <tr className="border-b border-gray-200">
                        <td className="flex items-center p-4 text-gray-700 space-x-2">
                          <FaClock className="text-blue-500" />
                          <span className="font-semibold">Commitment</span>
                        </td>
                        <td className="p-4 text-gray-600">
                          {course.customDuration} {course.durationUnit}
                        </td>
                      </tr>

                      {/* Language */}
                      <tr className="border-b border-gray-200">
                        <td className="flex items-center p-4 text-gray-700 space-x-2">
                          <FaLanguage className="text-blue-500" />
                          <span className="font-semibold">Category</span>
                        </td>
                        <td className="p-4 text-gray-600">{course.category}</td>
                      </tr>

                      {/* How to Pass */}
                      <tr className="border-b border-gray-200">
                        <td className="flex items-center p-4 text-gray-700 space-x-2">
                          <FaCheckCircle className="text-blue-500" />
                          <span className="font-semibold">Prerequisites</span>
                        </td>
                        <td className="p-4 text-gray-600">
                          {course.prerequisites}
                        </td>
                      </tr>

                      {/* User Ratings */}
                      <tr>
                        <td className="flex items-center p-4 text-gray-700 space-x-2">
                          <FaStar className="text-yellow-400" />
                          <span className="font-semibold">User Ratings</span>
                        </td>
                        <td className="p-4 text-gray-600 flex items-center space-x-2">
                          <div className="flex space-x-1 text-yellow-400">
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaRegStar />
                          </div>
                          <span className="text-gray-600">
                            Average User Rating 4.8
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
          <div className="overflow-x-auto"></div>
        </div>
      </div>
    </div>
  );
};

export default CourseContent;
