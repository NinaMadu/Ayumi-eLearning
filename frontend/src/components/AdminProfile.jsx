import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const AdminProfile = () => {
  const [instructor, setInstructor] = useState({
    name: '',
    email: '',
    bio: '',
    phone: '',
    experience: '',
    qualifications: '',
  });

  const currentUser = useSelector((state) => state.user.currentUser);

  // Fetch instructor profile
  const fetchInstructorProfile = async () => {
    if (currentUser && currentUser.email) {
      try {
        const response = await axios.get(`http://localhost:5000/api/instructor/${currentUser.email}`);
        setInstructor(response.data);
      } catch (error) {
        console.error('Error fetching instructor profile:', error);
      }
    }
  };

  // Update instructor profile
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put('http://localhost:5000/api/instructor/update', instructor);
      fetchInstructorProfile(); // Refresh the instructor data after updating
    } catch (error) {
      console.error('Error updating instructor profile:', error);
    }
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInstructor((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    fetchInstructorProfile(); // Fetch instructor profile on component mount
  }, [currentUser]); // Fetch when currentUser changes

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <div className="w-full max-w-4xl mt-10 p-5 bg-white rounded-lg shadow-lg">
        <h2 className="mt-4 text-2xl font-semibold text-gray-700 text-center">
          Instructor Profile
        </h2>
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-600 text-center">Personal Information</h3>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
                value={instructor.name || ''}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
                value={instructor.email || ''}
                readOnly // Make email read-only if needed
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Bio</label>
              <textarea
                name="bio"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
                value={instructor.bio || ''}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="text"
                name="phone"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
                value={instructor.phone || ''}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Experience</label>
              <input
                type="text"
                name="experience"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
                value={instructor.experience || ''}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Qualifications</label>
              <input
                type="text"
                name="qualifications"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
                value={instructor.qualifications || ''}
                onChange={handleChange}
              />
            </div>
          </div>
          <button
            onClick={handleUpdate}
            className="mt-6 w-full bg-blue-900 text-white py-2 rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
