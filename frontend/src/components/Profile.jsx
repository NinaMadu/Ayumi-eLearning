import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"; // Firebase storage imports
import ConfirmationBox from '../components/ConfirmationBox.jsx';
import SuccessBox from '../components/SuccessBox.jsx';

const Profile = () => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    bDay: '',
    gender: '',
    phone: '',
    avatar: '',
  });

  const [initialUser, setInitialUser] = useState({}); // Store the initial data to reset
  const [selectedImage, setSelectedImage] = useState(null); // Store selected image
  const [imagePreview, setImagePreview] = useState(''); // For previewing selected image
  const currentUser = useSelector((state) => state.user.currentUser);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSuccessBox, setShowSuccessBox] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const fetchUserProfile = async () => {
    if (currentUser && currentUser.email) {
      try {
        const response = await axios.get(`http://localhost:5000/api/profile/${currentUser.email}`);
        setUser(response.data);
        setInitialUser(response.data); // Set initial user data
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    }
  };

  // Handle selecting a new image
  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file); // Store the selected file
      setImagePreview(URL.createObjectURL(file)); // Create a preview URL
    }
  };

  // Handle updating the profile
  const handleUpdate = async (e) => {
    e.preventDefault();

    let avatarUrl = user.avatar; // Use existing avatar URL unless uploading a new one

    if (selectedImage) {
      // Upload the selected image to Firebase Storage
      const storage = getStorage();
      const storageRef = ref(storage, `avatars/${currentUser.email}`); // Use user email for file reference
      const uploadTask = uploadBytesResumable(storageRef, selectedImage);

      // Handle the upload process
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          console.error('Error uploading image:', error);
        },
        async () => {
          avatarUrl = await getDownloadURL(uploadTask.snapshot.ref); // Get the image URL from Firebase
          console.log('Image available at', avatarUrl);

          // Now update the user profile with the new avatar URL
          try {
            await axios.put('http://localhost:5000/api/profile/update', { ...user, avatar: avatarUrl });
            setSuccessMessage('Profile updated successfully!');
            setShowSuccessBox(true);
            fetchUserProfile();
             // Refresh the user data after updating
          } catch (error) {
            console.error('Error updating user profile:', error);
          }
        }
      );
    } else {
      // If no new image, just update the profile
      try {
        await axios.put('http://localhost:5000/api/profile/update', user);
        setShowSuccessBox(true);
        fetchUserProfile(); // Refresh the user data after updating
      } catch (error) {
        console.error('Error updating user profile:', error);
      }
    }

    setShowConfirmation(false);
  };

  // Handle cancel/resetting the form
  const handleCancel = () => {
    setUser(initialUser); // Reset all fields to the initial state
    setSelectedImage(null); // Clear the selected image
    setImagePreview(''); // Clear the image preview
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Open confirmation dialog
  const handleOpenConfirmation = () => {
    setShowConfirmation(true);
  };

  // Close confirmation dialog without updating
  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
  };

  const handleCloseSuccessBox = () => {
    setShowSuccessBox(false);
  };

  useEffect(() => {
    fetchUserProfile(); // Fetch user profile on component mount
  }, [currentUser]); // Fetch when currentUser changes

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      {showSuccessBox && (
  <SuccessBox
    title="Success"
    message="Profile updated!"
    onClose={handleCloseSuccessBox}
  />
)}
      {showConfirmation && (
        <ConfirmationBox
          title="Confirm Update"
          message="Are you sure you want to update your profile?"
          onConfirm={handleUpdate}
          onCancel={handleCloseConfirmation}
        />
      )}
      
      <div className="w-full max-w-4xl mt-10 p-5 bg-white rounded-lg shadow-lg">
        <div className="flex flex-col items-center">
          <label htmlFor="fileInput">
            <img
              className="w-32 h-32 rounded-full shadow-md cursor-pointer"
              src={imagePreview || user.avatar || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'}
              alt="Profile"
            />
            <input
              type="file"
              id="fileInput"
              className="hidden"
              onChange={handleImageSelect} // Trigger image selection
            />
          </label>
          <h2 className="mt-4 text-2xl font-semibold text-gray-700">
            {user.firstName} {user.lastName}
          </h2>
          <p className="mt-2 text-gray-500">{user.email}</p>
        </div>
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-600">Personal Information</h3>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">First Name</label>
              <input
                type="text"
                name="firstName"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
                value={user.firstName || ''}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Last Name</label>
              <input
                type="text"
                name="lastName"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
                value={user.lastName || ''}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
                value={user.email || ''}
                disabled // Make email read-only
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Birthday</label>
              <input
                type="date"
                name="bDay"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
                value={user.bDay || ''}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Gender</label>
              <select
                name="gender"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
                value={user.gender || ''}
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="text"
                name="phone"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
                value={user.phone || ''}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mt-6 flex justify-between">
            <button
              onClick={handleOpenConfirmation}
              className="w-full bg-blue-900 text-white py-2 rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mr-4"
            >
              Update Profile
            </button>
            <button
              onClick={handleCancel}
              className="w-full bg-red-600 text-white py-2 rounded-md shadow-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
