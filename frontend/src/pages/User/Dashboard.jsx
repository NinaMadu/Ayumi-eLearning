import React, { useEffect, useState } from "react";
import UserLayout from "../../components/UserLayout";
import RightBar from "../../components/RightBar";
import { FaBook, FaCheckCircle, FaCertificate } from "react-icons/fa";
import welcomeImage from "../../assets/welcome.jpg";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Notification from "../../components/Notification";




export const UDashboard = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [popularCourses, setPopularCourses] = useState([]);
  const [recentCourses, setRecentCourses] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [showNotification, setShowNotification] = useState(false);
  const [message, setMessage] = useState('');



  useEffect(() => {

    if (location.state && location.state.successMessage) {
    setMessage(location.state.successMessage);
    setShowNotification(true);
    // Clear the state so it's not shown again if user reloads
    window.history.replaceState({}, document.title);
    
    } 



    const fetchEnrolledCourses = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/users/user/${
            currentUser._id
          }/enrolled-courses`
        );
        const data = await res.json();

        if (res.ok) {
          setEnrolledCourses(data.enrolledCourses || []);
        } else {
          console.error(data.message || "Failed to fetch enrolled courses");
        }
      } catch (err) {
        console.error("Error fetching enrolled courses", err);
      }
    };

    fetchEnrolledCourses();
  }, [currentUser]);

  useEffect(() => {
    const fetchPopularCourses = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/course/popular`
        );
        const data = await res.json();
        if (res.ok) {
          setPopularCourses(data);
        } else {
          console.error(data.message || "Failed to fetch popular courses");
        }
      } catch (err) {
        console.error("Error fetching popular courses", err);
      }
    };

    fetchPopularCourses();
  }, []);

  useEffect(() => {
    const fetchRecentCourses = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/course/recent`
        );
        const data = await res.json();
        if (res.ok) {
          setRecentCourses(data);
        } else {
          console.error(data.message || "Failed to fetch recent courses");
        }
      } catch (err) {
        console.error("Error fetching recent courses", err);
      }
    };

    fetchRecentCourses();
  }, []);

  return (
    <UserLayout>
      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Main Dashboard Content */}
        {showNotification && (
          <Notification
            type="success"
            message={message}
            onClose={() => setShowNotification(false)}
          />
        )}
        <div className="flex-1 p-6 bg-white shadow-lg rounded-xl">
          {/* Welcome Banner */}
          <div
            className="relative mb-8 overflow-hidden rounded-xl"
            style={{
              height: "200px",
              backgroundImage: `url(${welcomeImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <h2 className="text-4xl font-bold text-white">
                Welcome Back, {currentUser.firstName || "User"}!
              </h2>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 gap-6 mb-8 sm:grid-cols-3">
            {[
              {
                icon: <FaBook />,
                label: "Courses In Progress",
                value: enrolledCourses.length,
                bg: "bg-blue-100",
                textColor: "text-blue-600",
                borderColors: ["border-blue-500", "border-blue-300"],
              },
              {
                icon: <FaCheckCircle />,
                label: "Courses Completed",
                value: enrolledCourses.filter((course) => course.isCompleted)
                  .length,
                bg: "bg-green-100",
                textColor: "text-green-600",
                borderColors: ["border-green-500", "border-green-300"],
              },
              {
                icon: <FaCertificate />,
                label: "Certificates Earned",
                value: enrolledCourses.filter((course) => course.hasCertificate)
                  .length,
                bg: "bg-yellow-100",
                textColor: "text-yellow-600",
                borderColors: ["border-yellow-500", "border-yellow-300"],
              },
            ].map((stat, idx) => (
              <div
                key={idx}
                className={`${stat.bg} relative p-4 rounded-lg flex flex-col items-center shadow`}
              >
                <div
                  className={`absolute inset-0 rounded-lg border-4 ${stat.borderColors[0]}`}
                  style={{
                    zIndex: -2,
                  }}
                ></div>
                <div
                  className={`absolute inset-1 rounded-lg border-4 ${stat.borderColors[1]}`}
                  style={{
                    zIndex: -1,
                  }}
                ></div>

                <div className={`text-3xl ${stat.textColor} mb-2`}>
                  {stat.icon}
                </div>
                <p className="font-medium text-md">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Enrolled Courses Section */}
          <div className="mt-4">
            <h2 className="mb-4 text-xl font-bold">My Learning</h2>
            {enrolledCourses.length > 0 ? (
              <div className="space-y-4">
                {enrolledCourses.map((course) => (
                  <div
                    key={course._id}
                    className="flex items-center p-4 overflow-hidden bg-white border rounded-lg shadow-md hover:transition-transform hover:scale-105"
                  >
                    {/* Thumbnail */}
                    <div
                      className="w-24 h-24 mr-4 bg-center bg-cover rounded-md"
                      style={{
                        backgroundImage: `url(${
                          course.introImage || welcomeImage
                        })`,
                      }}
                    ></div>

                    {/* Course Details */}
                    <div className="flex-1">
                      <h3 className="mb-2 text-lg font-bold text-gray-800 truncate">
                        {course.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        <span className="font-medium">Category:</span>{" "}
                        {course.category || "N/A"}
                      </p>
                      <p className="text-sm text-gray-500">
                        <span className="font-medium">Duration:</span>{" "}
                        {course.customDuration || "N/A"} {course.durationUnit}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-2 font-semibold">
                      <button
                        className="px-4 py-2 text-sm text-white transition bg-blue-800 rounded-lg shadow hover:bg-blue-600"
                        onClick={() =>
                          navigate(`/user/course-content/${course._id}`)
                        }
                      >
                        Go To Course
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">
                You are not enrolled in any courses yet.
              </p>
            )}
          </div>

          {/* Popular Courses Section */}
          <div className="mt-4">
            <h2 className="mb-6 text-xl font-bold text-center">
              Most Popular Courses
            </h2>
            {popularCourses.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {popularCourses.map((course) => (
                  <div
                    key={course._id}
                    className="p-4 bg-white border shadow-lg rounded-xl hover:transition-transform hover:scale-105"
                  >
                    {/* Thumbnail */}
                    <div
                      className="w-full h-48 mb-4 bg-center bg-cover rounded-t-lg"
                      style={{
                        backgroundImage: `url(${
                          course.introImage || welcomeImage
                        })`,
                      }}
                    ></div>

                    {/* Course Details */}
                    <div className="flex-1">
                      <h3 className="mb-2 text-lg font-bold text-gray-800 truncate">
                        {course.title}
                      </h3>
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-medium">Category:</span>{" "}
                        {course.category || "N/A"}
                      </p>
                      <p className="mb-4 text-sm text-gray-500">
                        <span className="font-medium">Duration:</span>{" "}
                        {course.customDuration || "N/A"} {course.durationUnit}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div>
                      <button
                        className="w-full py-2 text-sm font-semibold text-white transition bg-blue-500 rounded-lg shadow hover:bg-blue-600"
                        onClick={() =>
                          navigate(`/user/courseIntro/${course._id}`)
                        }
                      >
                        View Course
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-600">
                There is no popular course available at the moment.
              </p>
            )}
          </div>

          <div className="mt-8">
            <h2 className="mb-6 text-xl font-bold text-center">
              Recently Added Courses
            </h2>
            {recentCourses.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 ">
                {recentCourses.map((course) => (
                  <div
                    key={course._id}
                    className="flex flex-col p-4 bg-white border shadow-lg rounded-xl hover:transition-transform hover:scale-105"
                  >
                    {/* Thumbnail */}
                    <div
                      className="w-full h-48 mb-4 bg-center bg-cover rounded-t-lg"
                      style={{
                        backgroundImage: `url(${
                          course.introImage || welcomeImage
                        })`,
                      }}
                    ></div>

                    {/* Course Details */}
                    <div className="flex-1">
                      <h3 className="mb-2 text-lg font-bold text-gray-800 truncate">
                        {course.title}
                      </h3>
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-medium">Category:</span>{" "}
                        {course.category || "N/A"}
                      </p>
                      <p className="mb-4 text-sm text-gray-500">
                        <span className="font-medium">Duration:</span>{" "}
                        {course.customDuration || "N/A"} {course.durationUnit}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div>
                      <button
                        className="w-full py-2 text-sm font-semibold text-white transition rounded-lg shadow bg-custom-red hover:bg-red-400"
                        onClick={() =>
                          navigate(`/user/courseIntro/${course._id}`)
                        }
                      >
                        Explore Course
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-600">
                No recently added courses available at the moment.
              </p>
            )}
          </div>
        </div>

        {/* Right Sidebar */}
        {/* <RightBar /> */}
      </div>
    </UserLayout>
  );
};

export default UDashboard;
