import React, { useEffect, useState } from "react";
import UserLayout from "../../components/UserLayout";
import RightBar from "../../components/RightBar";
import { FaBook, FaCheckCircle, FaCertificate } from "react-icons/fa";
import welcomeImage from "../../assets/welcome.jpg";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const UDashboard = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [popularCourses, setPopularCourses] = useState([]);
  const [recentCourses, setRecentCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
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
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main Dashboard Content */}
        <div className="flex-1 bg-white p-6 rounded-xl shadow-lg">
          {/* Welcome Banner */}
          <div
            className="relative mb-8 rounded-xl overflow-hidden"
            style={{
              height: "200px",
              backgroundImage: `url(${welcomeImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <h2 className="text-4xl font-bold text-white">
                Welcome Back, {currentUser.firstName || "User"}!
              </h2>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
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
                <p className="text-md font-medium">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Enrolled Courses Section */}
          <div className="mt-4">
            <h2 className="text-xl font-bold mb-4">My Learning</h2>
            {enrolledCourses.length > 0 ? (
              <div className="space-y-4">
                {enrolledCourses.map((course) => (
                  <div
                    key={course._id}
                    className="bg-white rounded-lg shadow-md overflow-hidden border p-4 flex items-center hover:transition-transform hover:scale-105"
                  >
                    {/* Thumbnail */}
                    <div
                      className="w-24 h-24 bg-cover bg-center rounded-md mr-4"
                      style={{
                        backgroundImage: `url(${
                          course.introImage || welcomeImage
                        })`,
                      }}
                    ></div>

                    {/* Course Details */}
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-800 truncate mb-2">
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
                        className="bg-blue-800 text-white px-4 py-2 rounded-lg text-sm shadow hover:bg-blue-600 transition"
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
            <h2 className="text-xl font-bold mb-6 text-center">
              Most Popular Courses
            </h2>
            {popularCourses.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {popularCourses.map((course) => (
                  <div
                    key={course._id}
                    className="bg-white rounded-xl shadow-lg border p-4 hover:transition-transform hover:scale-105"
                  >
                    {/* Thumbnail */}
                    <div
                      className="w-full h-48 bg-cover bg-center rounded-t-lg mb-4"
                      style={{
                        backgroundImage: `url(${
                          course.introImage || welcomeImage
                        })`,
                      }}
                    ></div>

                    {/* Course Details */}
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-800 truncate mb-2">
                        {course.title}
                      </h3>
                      <p className="text-sm text-gray-500 mb-2">
                        <span className="font-medium">Category:</span>{" "}
                        {course.category || "N/A"}
                      </p>
                      <p className="text-sm text-gray-500 mb-4">
                        <span className="font-medium">Duration:</span>{" "}
                        {course.customDuration || "N/A"} {course.durationUnit}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div>
                      <button
                        className="w-full bg-blue-500 text-white py-2 rounded-lg text-sm font-semibold shadow hover:bg-blue-600 transition"
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
              <p className="text-gray-600 text-center">
                There is no popular course available at the moment.
              </p>
            )}
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-bold mb-6 text-center">
              Recently Added Courses
            </h2>
            {recentCourses.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
                {recentCourses.map((course) => (
                  <div
                    key={course._id}
                    className="bg-white rounded-xl shadow-lg border p-4 hover:transition-transform hover:scale-105 flex flex-col"
                  >
                    {/* Thumbnail */}
                    <div
                      className="w-full h-48 bg-cover bg-center rounded-t-lg mb-4"
                      style={{
                        backgroundImage: `url(${
                          course.introImage || welcomeImage
                        })`,
                      }}
                    ></div>

                    {/* Course Details */}
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-800 truncate mb-2">
                        {course.title}
                      </h3>
                      <p className="text-sm text-gray-500 mb-2">
                        <span className="font-medium">Category:</span>{" "}
                        {course.category || "N/A"}
                      </p>
                      <p className="text-sm text-gray-500 mb-4">
                        <span className="font-medium">Duration:</span>{" "}
                        {course.customDuration || "N/A"} {course.durationUnit}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div>
                      <button
                        className="w-full bg-custom-red text-white py-2 rounded-lg text-sm font-semibold shadow hover:bg-red-400 transition"
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
              <p className="text-gray-600 text-center">
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
