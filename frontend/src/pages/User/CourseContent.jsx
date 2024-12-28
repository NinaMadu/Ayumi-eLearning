import React, { useState } from "react";
import Header from "../../components/Header";
import { FaArrowAltCircleDown, FaArrowAltCircleUp, FaRegArrowAltCircleDown } from "react-icons/fa";
import { FaCheckCircle, FaCircle } from 'react-icons/fa';

const CourseContent = () => {
  const sections = [
    {
      id: 1,
      title: "Introduction to Machine Learning",
      description:
        "Explore the basics of machine learning and its applications.",
      objectives: [
        "Understand machine learning basics.",
        "Learn about supervised and unsupervised learning.",
        "Complete the intake survey.",
      ],
      videos: [
        { id: 1, title: "What is Machine Learning?", url: "https://www.youtube.com/watch?v=example1" },
        { id: 2, title: "Types of Machine Learning", url: "https://www.youtube.com/watch?v=example2" }
      ]
    },
    {
      id: 2,
      title: "Supervised Learning Methods",
      description: "Dive deeper into regression and classification models.",
      objectives: [
        "Learn about regression and classification.",
        "Explore evaluation metrics.",
      ],
      videos: [
        { id: 1, title: "Regression Basics", url: "https://www.youtube.com/watch?v=example3" },
        { id: 2, title: "Classification Models", url: "https://www.youtube.com/watch?v=example4" }
      ]
    },
    {
      id: 3,
      title: "Unsupervised Learning Methods",
      description:
        "Understand clustering and dimensionality reduction techniques.",
      objectives: [
        "Explore clustering algorithms.",
        "Understand dimensionality reduction.",
      ],
      videos: [
        { id: 1, title: "Clustering Techniques", url: "https://www.youtube.com/watch?v=example5" },
        { id: 2, title: "Dimensionality Reduction", url: "https://www.youtube.com/watch?v=example6" }
      ]
    },
  ];

  const [selectedSectionId, setSelectedSectionId] = useState(1);
  const [expanded, setExpanded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("courseMaterials");

  const selectedSection = sections.find(
    (section) => section.id === selectedSectionId
  );

  const isCompleted = (sectionId) => {
    const completedSections = [1, 2]; // Hardcoded completed sections for example
    return completedSections.includes(sectionId);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="bg-gray-50 py-20 min-h-screen">
      {/* Header */}
      <Header />

      {/* Main Layout */}
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-1/4 text-black font-semibold p-6 shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Course Content</h2>
          <ul>
            <li
              onClick={() => handleCategoryClick("courseMaterials")}
              className={`cursor-pointer p-4 mb-4 transition-all duration-200 hover:bg-slate-300 hover:shadow-md ${
                selectedCategory === "courseMaterials" ? "bg-slate-400 text-white rounded-lg" : ""
              }`}
            >
              Course Materials
            </li>
            <li
              onClick={() => handleCategoryClick("notes")}
              className={`cursor-pointer p-4 mb-4 transition-all duration-200 hover:bg-slate-300 hover:shadow-md ${
                selectedCategory === "notes" ? "bg-slate-400 text-white rounded-lg" : ""
              }`}
            >
              Notes
            </li>
            <li
              onClick={() => handleCategoryClick("messages")}
              className={`cursor-pointer p-4 mb-4 transition-all duration-200 hover:bg-slate-300 hover:shadow-md ${
                selectedCategory === "messages" ? "bg-slate-400 text-white rounded-lg" : ""
              }`}
            >
              Messages
            </li>
            <li
              onClick={() => handleCategoryClick("courseInfo")}
              className={`cursor-pointer p-4 mb-4 transition-all duration-200 hover:bg-slate-300 hover:shadow-md ${
                selectedCategory === "courseInfo" ? "bg-slate-400 text-white rounded-lg" : ""
              }`}
            >
              Course Info
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-white p-8 shadow-inner">
          {/* Render Content Based on Selected Category */}
          {selectedCategory === "courseMaterials" && (
            <div>
              <div className="text-black bg-slate-100 p-6 rounded-lg mb-6 shadow-lg">
                <h1 className="text-3xl font-extrabold">{selectedSection.title}</h1>
                <p className="mt-2 text-lg">{selectedSection.description}</p>
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
                {expanded ? "Hide Learning Objectives" : "Show Learning Objectives"}
              </button>

              {expanded && (
                <ul className="mt-6 space-y-3 text-gray-700">
                  {selectedSection.objectives.map((objective, index) => (
                    <li
                      key={index}
                      className="p-3 rounded-lg bg-gray-100 shadow-sm hover:shadow-md transition-all duration-200"
                    >
                      {objective}
                    </li>
                  ))}
                </ul>
              )}

              {/* Video Playlist */}
              <div className="mt-8">
                <h2 className="text-xl font-bold">Video Playlist</h2>
                <ul className="mt-4 space-y-3">
                  {selectedSection.videos.map((video) => (
                    <li key={video.id} className="flex items-center space-x-4">
                      <FaCheckCircle className="text-green-500" />
                      <a
                        href={video.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        {video.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {selectedCategory === "notes" && (
            <div>
              <h2 className="text-2xl font-bold">Notes</h2>
              <p className="mt-2 text-lg">Here are some important notes for the course...</p>
            </div>
          )}

          {selectedCategory === "messages" && (
            <div>
              <h2 className="text-2xl font-bold">Messages</h2>
              <p className="mt-2 text-lg">Here are your course messages...</p>
            </div>
          )}

          {selectedCategory === "courseInfo" && (
            <div>
              <h2 className="text-2xl font-bold">Course Information</h2>
              <p className="mt-2 text-lg">Details about the course...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseContent;
