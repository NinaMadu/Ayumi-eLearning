import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import {
  FaArrowAltCircleDown,
  FaRegArrowAltCircleDown,
  FaPlayCircle,
} from "react-icons/fa";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const CourseContent = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);
  const [course, setCourse] = useState(null);
  const [objectives, setObjectives] = useState([]);
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

    const fetchCourse = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/course/${courseId}`);
        setCourse(response.data.course); // Use the response data directly
        setLoading(false);
      } catch (err) {
        setError("Error fetching course details");
        setLoading(false);
      }
    };

    const fetchCourseVideos = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/courses/${courseId}/videos`
        );
        setVideos(response.data.videos); // Set the course videos
      } catch (error) {
        setError("Error fetching course videos.");
      }
    };

    fetchCourse(); // Fetch course data
    fetchCourseVideos(); // Fetch course videos
  }, [courseId]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="bg-gray-50 py-20 min-h-screen font-sans">
      <Header />
      <div className="flex h-screen">
        <div className="w-1/4 text-black font-semibold p-6 shadow-xl bg-white rounded-xl">
          <h2 className="text-2xl font-bold mb-8 text-blue-600">Course Content</h2>
          <ul className="space-y-8 ">
            <li
              onClick={() => handleCategoryClick("courseMaterials")}
              className="cursor-pointer hover:text-blue-600 transition-all duration-200 shadow-md p-2 rounded-lg"
            >
              Course Materials
            </li>
            <li
              onClick={() => handleCategoryClick("notes")}
              className="cursor-pointer hover:text-blue-600 transition-all duration-200 shadow-md p-2 rounded-lg"
            >
              Notes
            </li>
            <li
              onClick={() => handleCategoryClick("messages")}
              className="cursor-pointer hover:text-blue-600 transition-all duration-200 shadow-md p-2 rounded-lg"
            >
              Messages
            </li>
            <li
              onClick={() => handleCategoryClick("courseInfo")}
              className="cursor-pointer hover:text-blue-600 transition-all duration-200 shadow-md p-2 rounded-lg"
            >
              Course Info
            </li>
          </ul>
        </div>

        <div className="flex-1 bg-white p-8 shadow-inner rounded-xl overflow-auto">
          {loading && (
            <p className="text-center text-gray-600">Loading videos...</p>
          )}
          {error && <p className="text-center text-red-500">{error}</p>}

          {selectedCategory === "courseMaterials" && course && (
            <div>
              <div className="text-black bg-slate-100 p-6 rounded-lg mb-6 shadow-lg">
                <h1 className="text-3xl font-extrabold text-blue-700">
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
                    <h3 className="text-xl font-semibold text-blue-600">
                      Learning Objectives
                    </h3>
                    {course.objectives.map((objective, index) => (
                      <li key={index} className="text-lg">
                        {objective}
                      </li>
                    ))}
                  </ul>
                )}

              {videos.length > 0 ? (
                <div className="flex flex-col gap-6 mt-6">
                  {videos.map((video) => (
                    <div key={video._id} className="bg-white rounded-lg shadow-sm">
                      <div className="p-4 flex gap-2">
                        <FaPlayCircle
                          className="mr-2 transform rotate-180 transition-transform duration-200 hover:text-blue-600 cursor-pointer"
                          onClick={() =>
                            navigate(`/instructor/videoPreview/${video.videoId}`)
                          }
                        />
                        <h3
                          className="text-lg text-gray-800 font-semibold hover:bg-slate-50 cursor-pointer"
                          onClick={() =>
                            navigate(`/instructor/videoPreview/${video.videoId}`)
                          }
                        >
                          {video.title}
                        </h3>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-600">No videos available.</p>
              )}
            </div>
          )}

          {/* Render other categories based on the selection */}
        </div>
      </div>
    </div>
  );
};

export default CourseContent;
