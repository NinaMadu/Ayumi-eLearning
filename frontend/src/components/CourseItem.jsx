import React from "react";

const CourseItem = ({ course }) => {
  return (
    <div>
      <form className="flex items-center w-full max-w-md mx-auto bg-white border border-slate-200 rounded-full p-1">
        <input
          type="text"
          className="flex-grow px-4 py-2 text-gray-700 placeholder-gray-500 rounded-l-full focus:outline-none"
          placeholder="Search courses..."
          value=""
        />
        <button
          type="submit"
          className="bg-blue-800 text-white rounded-full p-2 focus:outline-none hover:bg-blue-700 transition duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-4.35-4.35M11 4a7 7 0 100 14 7 7 0 000-14z"
            />
          </svg>
        </button>
      </form>

      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg transition duration-300 transform hover:scale-105 hover:shadow-xl overflow-hidden m-8">
        <a href="#">
          <img
            className="w-full h-48 object-cover"
            src="https://img.freepik.com/premium-vector/language-school-japanese-course_277904-9980.jpg"
            alt="Course"
          />
        </a>
        <div className="p-5">
          <a href="#">
            <h5 className="mb-2 text-xl font-semibold text-gray-800 leading-tight hover:text-blue-600 transition duration-300">
              Master Japanese Language: Beginner to Intermediate
            </h5>
          </a>
          <p className="mb-4 text-sm text-gray-600">
            Join our comprehensive Japanese course designed to help you master
            essential grammar, vocabulary, and conversational skills. Perfect
            for beginners aiming to reach an intermediate level.
          </p>
          <a
            href="#"
            className="inline-flex items-center px-4 py-2  text-white text-sm font-medium rounded-lg shadow-md hover:opacity-90 transition duration-300 focus:outline-none focus:ring-2 focus:ring-orange-700"
            style={{
              background: "linear-gradient(to right, #DC7676, #C53B3B )",
            }}
          >
            Enroll Now
            <svg
              className="w-4 h-4 ml-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 12h14M12 5l7 7-7 7"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default CourseItem;
