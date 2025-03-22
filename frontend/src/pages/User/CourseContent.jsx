import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Header from "../../components/Header";
import Discussion from "../../components/Discussion.jsx";
import Messaging from "./Message.jsx";
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
import { useSelector } from "react-redux";

// import {ProgressBarComponent} from '@syncfusion/ej2-react-progressbar';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const CourseContent = () => {
  const currentUser = useSelector((state) => state.user.currentUser);

  const userId = currentUser._id;

  const { courseId } = useParams();
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);
  const [course, setCourse] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("courseMaterials");
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [progress, setProgress] = useState(null);

  useEffect(() => {
    if (!courseId) {
      setError("Course ID is missing in the URL");
      setLoading(false);

      return;
    }

    console.log(userId);

    const fetchCourseData = async () => {
      try {
        const [courseRes, videosRes, progressRes, assignmentRes] =
          await Promise.all([
            axios.get(`${API_BASE_URL}/api/course/${courseId}`),
            axios.get(`${API_BASE_URL}/api/courses/${courseId}/videos`),
            axios.get(
              `${API_BASE_URL}/api/users/user/${userId}/course/${courseId}/progress`
            ),
            axios.get(`${API_BASE_URL}/api/assignments/course/${courseId}`),
          ]);
        setCourse(courseRes.data.course);
        setVideos(videosRes.data.videos);
        // console.log("Response:",progressRes);
        setProgress(progressRes.data.progress);
        setAssignments(assignmentRes.data.assignments);
        // console.log("Progress:",progress);
      } catch (err) {
        setError("Error fetching course details or videos");
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [courseId, userId]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="min-h-screen py-20 font-sans bg-gray-50">
      <Header />
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-1/4 p-6 font-semibold text-black bg-white shadow-xl rounded-xl">
          <h2 className="mb-8 text-2xl font-bold text-blue-800">
            Course Content
          </h2>
          <ul className="space-y-8">
            {[
              "courseMaterials",
              "notes",
              "courseInfo",
              "messages",
              "assignments",
              "contact Instructor",
            ].map((category) => (
              <li
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`cursor-pointer hover:text-blue-800 transition-all duration-200 shadow-md p-2 rounded-lg ${
                  selectedCategory === category ? "text-blue-800" : ""
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </li>
            ))}
          </ul>
          {/* Progress Bar Section */}
          {progress !== null && (
            <div className="p-4 my-6 border-l-4 border-blue-400 rounded-lg bg-blue-50">
              <h3 className="mb-2 text-lg font-semibold text-gray-700">
                Your Progress
              </h3>
              <div className="relative w-full h-4 overflow-hidden bg-gray-200 rounded-full">
                <div
                  className="h-full transition-all duration-700 bg-blue-500"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="mt-2 text-gray-600">
                {progress.toFixed(2)}% Completed
              </p>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8 overflow-auto bg-white shadow-inner rounded-xl">
          {loading && <p className="text-center text-gray-600">Loading...</p>}
          {error && <p className="text-center text-red-500">{error}</p>}

          {selectedCategory === "courseMaterials" && course && (
            <div>
              <div className="p-6 mb-6 text-black rounded-lg shadow-lg bg-slate-100">
                <h1 className="text-3xl font-extrabold text-blue-800">
                  {course.title}
                </h1>
                <p className="mt-2 text-gray-600 text-md">
                  {course.description}
                </p>
              </div>

              <button
                onClick={() => setExpanded(!expanded)}
                className="flex items-center px-6 py-3 transition-all duration-200 rounded-lg shadow text-slate-700 hover:bg-slate-300 focus:outline-none"
              >
                {expanded ? (
                  <FaArrowAltCircleDown className="mr-2 transition-transform duration-200 transform rotate-180" />
                ) : (
                  <FaRegArrowAltCircleDown className="mr-2 transition-transform duration-200 transform rotate-0" />
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
                      <div className="flex gap-2 p-4">
                        <FaPlayCircle
                          className="mt-2 mr-2 transition-transform duration-200 transform rotate-180 cursor-pointer hover:text-blue-600"
                          onClick={() =>
                            navigate(
                              `/user/course/${courseId}/video/${video.videoId}`
                            )
                          }
                        />
                        <h3
                          className="text-lg font-semibold text-gray-800 cursor-pointer hover:bg-slate-50"
                          onClick={() =>
                            navigate(
                              `/user/course/${courseId}/video/${video.videoId}`
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
              <h2 className="pb-4 text-xl font-semibold">About this Course</h2>
              <p>{course.description}</p>

              {course.instructor && (
                <div className="items-center gap-8 mt-6">
                  <div></div>
                  <h3 className="mb-4 text-lg font-semibold text-gray-900">
                    Taught by:
                  </h3>
                  <div className="flex items-center mb-6 space-x-4">
                    {course.instructor.avatar ? (
                      <img
                        src={course.instructor.avatar}
                        alt={course.instructor.name}
                        className="object-cover w-16 h-16 rounded-full"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-16 h-16 bg-gray-300 rounded-full">
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
                        <td className="flex items-center p-4 space-x-2 text-gray-700">
                          <FaCheckCircle className="text-blue-500" />
                          <span className="font-semibold">Level</span>
                        </td>
                        <td className="p-4 text-gray-600">
                          {course.difficulty}
                        </td>
                      </tr>

                      {/* Commitment */}
                      <tr className="border-b border-gray-200">
                        <td className="flex items-center p-4 space-x-2 text-gray-700">
                          <FaClock className="text-blue-500" />
                          <span className="font-semibold">Commitment</span>
                        </td>
                        <td className="p-4 text-gray-600">
                          {course.customDuration} {course.durationUnit}
                        </td>
                      </tr>

                      {/* Language */}
                      <tr className="border-b border-gray-200">
                        <td className="flex items-center p-4 space-x-2 text-gray-700">
                          <FaLanguage className="text-blue-500" />
                          <span className="font-semibold">Category</span>
                        </td>
                        <td className="p-4 text-gray-600">{course.category}</td>
                      </tr>

                      {/* How to Pass */}
                      <tr className="border-b border-gray-200">
                        <td className="flex items-center p-4 space-x-2 text-gray-700">
                          <FaCheckCircle className="text-blue-500" />
                          <span className="font-semibold">Prerequisites</span>
                        </td>
                        <td className="p-4 text-gray-600">
                          {course.prerequisites}
                        </td>
                      </tr>

                      {/* User Ratings */}
                      <tr>
                        <td className="flex items-center p-4 space-x-2 text-gray-700">
                          <FaStar className="text-yellow-400" />
                          <span className="font-semibold">User Ratings</span>
                        </td>
                        <td className="flex items-center p-4 space-x-2 text-gray-600">
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

          {selectedCategory === "notes" && (
            <div>
              <h2 className="pb-4 text-xl font-semibold">Notes</h2>
              <p className="text-gray-600">
                Notes are not available for this course.
              </p>
            </div>
          )}

          {selectedCategory === "messages" && (
            <Discussion courseId={courseId} />
          )}

          {selectedCategory === "assignments" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Course Assignments
              </h2>
              {assignments.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  {assignments.map((assignment) => (
                    <div
                      key={assignment._id}
                      className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">
                            {assignment.title}
                          </h3>
                          <p className="text-gray-600 mt-2">
                            {assignment.description}
                          </p>
                          <div className="mt-3 flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <FaClock className="text-blue-500" />
                              <span>
                                Due:{" "}
                                {new Date(assignment.deadline).toISOString().split("T")[0]}
           
                              </span>
                            </div>
                            <span className="px-2 py-1 bg-gray-100 rounded">
                              {assignment.status || "Not Started"}
                            </span>
                          </div>
                        </div>
                        <Link
                          to={`/user/assignments/${courseId}/${assignment._id}`}
                          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                        >
                          View Assignment
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                  <p className="text-gray-500">
                    No assignments available for this course
                  </p>
                </div>
              )}
            </div>
          )}

          {selectedCategory === "contact Instructor" && (
            <Messaging instructor={course.instructor} />
          )}

          <div className="overflow-x-auto"></div>
        </div>
      </div>
    </div>
  );
};

export default CourseContent;
