import React, { useEffect, useState } from "react";
import UserLayout from "../../components/UserLayout";
import RightBar from "../../components/RightBar";
import { FaBook, FaCheckCircle, FaCertificate } from "react-icons/fa";
import welcomeImage from "../../assets/welcome.jpg";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";
import { useSelector } from "react-redux";

export const UDashboard = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [user, setUser] = useState({
    firstName: "",
  });

  const [initialUser, setInitialUser] = useState({});
  const activityData = [
    { name: "Mon", activity: 30 },
    { name: "Tue", activity: 45 },
    { name: "Wed", activity: 40 },
    { name: "Thu", activity: 35 },
    { name: "Fri", activity: 50 },
    { name: "Sat", activity: 55 },
    { name: "Sun", activity: 60 },
  ];

  const fetchUserDetails = async () => {
    if (currentUser && currentUser.email) {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/profile/${currentUser.email}`
        );
        setUser(response.data);
        setInitialUser(response.data); 
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    }
  };

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
                value: 10,
                bg: "bg-blue-100",
                textColor: "text-blue-600",
                borderColors: ["border-blue-500", "border-blue-300"],
              },
              {
                icon: <FaCheckCircle />,
                label: "Courses Completed",
                value: 10,
                bg: "bg-green-100",
                textColor: "text-green-600",
                borderColors: ["border-green-500", "border-green-300"],
              },
              {
                icon: <FaCertificate />,
                label: "Certificates Earned",
                value: 10,
                bg: "bg-yellow-100",
                textColor: "text-yellow-600",
                borderColors: ["border-yellow-500", "border-yellow-300"],
              },
            ].map((stat, idx) => (
              <div
                key={idx}
                className={`${stat.bg} relative p-4 rounded-lg flex flex-col items-center shadow`}
              >
                {/* Two-color border */}
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

          {/* Progress Section */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">My Learnings</h3>
            <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-6 justify-items-center">
              {Array(3)
                .fill(null)
                .map((_, idx) => (
                  <div
                    key={idx}
                    className="bg-white p-4 rounded-xl shadow-lg w-full max-w-xs"
                  >
                    <div
                      className="w-full h-32 bg-gray-300 rounded-md mb-4"
                      style={{
                        background:
                          "linear-gradient(to right, #4A90E2, #50C878)",
                      }}
                    ></div>
                    <p className="text-lg font-medium text-center">
                      Course Name
                    </p>
                    <p className="text-gray-500 text-sm text-center">
                      Progress: 90%
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <RightBar />
      </div>
    </UserLayout>
  );
};

export default UDashboard;
