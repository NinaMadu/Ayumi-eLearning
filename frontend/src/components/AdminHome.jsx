import React from "react";
import AdminLayout from "./AdminLayout";
import logo from "../assets/logo.png";
import Pic1 from "../assets/Pic1.jpeg";
import Pic2 from "../assets/Pic2.jpeg";
import Pic3 from "../assets/Pic3.jpeg";
import Notices from "../components/Notices";

const AdminHome = () => {
  return (
    <AdminLayout>
      <div className="container mx-auto flex-1 py-8">
        {/* Welcome Section */}
        <div className="flex flex-col items-center text-center px-6 lg:px-16 gap-8">
          <div className="mb-6">
            <h1 className="text-4xl md:text-6xl font-bold text-[#2B3090] mb-4">
              Ayumi Japanese Language Institute
            </h1>
            <p className="text-lg text-gray-700 font-semibold">
              Welcome to the Admin Panel of Ayumi Japanese Language Institute.
              Our mission is to foster a deep understanding and appreciation of
              the Japanese language and culture, empowering students to achieve
              their academic, professional, and personal goals.
            </p>
            <p className="text-lg text-gray-700 mt-4 font-semibold">
              At Ayumi, we are committed to excellence in teaching, offering
              state-of-the-art facilities, experienced instructors, and a
              curriculum designed to cater to diverse learning needs. Whether
              you're managing courses, tracking student progress, or planning
              new initiatives, this admin panel is here to streamline your
              workflow and support our mission of delivering top-notch
              education.
            </p>
          </div>

          <div className="flex justify-center items-center gap-8">
            {/* Logo */}
            <img
              src={logo}
              alt="Institute Logo"
              className="w-80 lg:w-80 object-contain"
            />

            {/* Buttons */}
            <div className="flex gap-8">
              <button
                className="py-2 px-8 rounded-xl text-white font-medium"
                style={{
                  background: "linear-gradient(to right, #DC7676, #C53B3B)",
                }}
              >
                Manage Courses
              </button>
              <button
                className="py-2 px-8 rounded-xl text-white font-medium"
                style={{
                  background: "linear-gradient(to right, #2B3090, #8487BE)",
                }}
              >
                View Students
              </button>
            </div>
          </div>
        </div>

        {/* Highlights Section */}
        <div className="mt-12 px-6 lg:px-16 text-center">
          <h2 className="text-3xl font-bold text-[#2B3090] mb-6">
            Our Mission
          </h2>
          <p className="text-lg text-gray-700 mb-6 font-semibold">
            At Ayumi, we strive to empower students by providing comprehensive
            Japanese language courses designed to cater to every proficiency
            level. Our mission is to make language learning accessible,
            engaging, and effective for all.
          </p>
        </div>

        {/* Image Gallery */}
        <div className="mt-12 px-6 lg:px-16">
          <h2 className="text-3xl font-bold text-[#2B3090] text-center mb-6">
            Gallery
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <img
              src={Pic1}
              alt="Classroom Activity 1"
              className="w-full h-48 object-cover rounded-lg shadow-md"
            />
            <img
              src={Pic2}
              alt="Classroom Activity 2"
              className="w-full h-48 object-cover rounded-lg shadow-md"
            />
            <img
              src={Pic3}
              alt="Classroom Activity 3"
              className="w-full h-48 object-cover rounded-lg shadow-md"
            />
          </div>
        </div>

        {/* Notices Section */}
        <div className="mt-12 px-6 lg:px-16">
          <h2 className="text-3xl font-bold text-[#2B3090] text-center mb-6">
            Notices
          </h2>
          <div className="bg-slate-100 p-6 rounded-lg shadow-md">
            <Notices />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminHome;
