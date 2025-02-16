import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import UserLayout from '../../components/UserLayout';

const Discussion = () => {  

  return (
    <div>
    <UserLayout />
    <div className="container mx-auto shadow-lg rounded-lg">
      {/* Header */}
      <div className="px-5 py-5 flex justify-between items-center bg-white border-b-2">
        <div className="font-semibold text-2xl">GoingChat</div>
        <div className="w-1/2">
          <input
            type="text"
            placeholder="search favorite courses..."
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value); // Update input text
              setSearchQuery(e.target.value); // Update search query for filtering
            }}
            className="rounded-2xl bg-gray-100 py-3 px-5 w-full"
          />
        </div>
        <div className="h-12 w-12 p-2 bg-yellow-500 rounded-full text-white font-semibold flex items-center justify-center">
          RA
        </div>
      </div>
      {/* End Header */}

      {/* Chatting and Courses Grid */}
      <div className="flex flex-row justify-between bg-white">
        {/* Chat List */}
        <div className="flex flex-col w-2/5 border-r-2 overflow-y-auto">
          <div className="border-b-2 py-4 px-2">
            <input
              type="text"
              placeholder="search chatting"
              className="py-2 px-2 border-2 border-gray-200 rounded-2xl w-full"
            />
          </div>
          {/* User List */}
          <div className="flex flex-row py-4 px-2 justify-center items-center border-b-2">
            <div className="w-1/4">
              <img
                src="https://source.unsplash.com/_7LbC5J-jw4/600x600"
                className="object-cover h-12 w-12 rounded-full"
                alt=""
              />
            </div>
            <div className="w-full">
              <div className="text-lg font-semibold">Luis1994</div>
              <span className="text-gray-500">Pick me at 9:00 Am</span>
            </div>
          </div>
        </div>
        {/* End Chat List */}

        {/* Message Section and Courses Grid */}
        <div className="w-full px-5 flex flex-col justify-between">
          <div className="flex flex-col mt-5">
            {/* Message Items */}
            <div className="flex justify-end mb-4">
              <div className="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
                Welcome to group everyone!
              </div>
              <img
                src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                className="object-cover h-8 w-8 rounded-full"
                alt=""
              />
            </div>
            {/* Courses Grid */}
            <div className="grid grid-cols-1 gap-8 mt-8 sm:grid-cols-2 lg:grid-cols-3">
              {filteredCourses.length > 0 ? (
                filteredCourses.map((course) => (
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
                ))
              ) : (
                <p className="mt-8 text-3xl font-bold text-center text-black-500">No favorite courses found!</p>
              )}
            </div>
          </div>

          {/* Input Area */}
          <div className="py-5">
            <input
              className="w-full bg-gray-300 py-5 px-3 rounded-xl"
              type="text"
              placeholder="type your message here..."
            />
          </div>
        </div>
        {/* End Message Section */}
      </div>
      {/* End Chatting */}
    </div>
    </div>
  );
};

export default Discussion;
