import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'; // Firebase storage imports
import ConfirmationBox from '../../components/ConfirmationBox.jsx';
import SuccessBox from '../../components/SuccessBox.jsx';

const InstructorProfile = () => {
  const [instructor, setInstructor] = useState({
    firstName: '',
    lastName: '',
    email: '',
    gender: '',
    phone: '',
    avatar: '',
    qualifications: '', // New field for instructors
    bio: '', // Another possible field for instructor bio
  });

  const [initialInstructor, setInitialInstructor] = useState({}); // Store the initial data to reset
  const [selectedImage, setSelectedImage] = useState(null); // Store selected image
  const [imagePreview, setImagePreview] = useState(''); // For previewing selected image
  const currentUser = useSelector((state) => state.user.currentUser); // Assuming currentUser contains instructor details
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSuccessBox, setShowSuccessBox] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const fetchInstructorProfile = async () => {
    if (currentUser && currentUser.email) {
      try {
        const response = await axios.get(`http://localhost:5000/api/instructorProfile/${currentUser.email}`);
        setInstructor(response.data);
        setInitialInstructor(response.data); // Set initial instructor data
      } catch (error) {
        console.error('Error fetching instructor profile:', error);
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

    let avatarUrl = instructor.avatar; // Use existing avatar URL unless uploading a new one

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

          // Now update the instructor profile with the new avatar URL
          try {
            await axios.put('http://localhost:5000/api/instructorProfile/update', { ...instructor, avatar: avatarUrl });
            setSuccessMessage('Profile updated successfully!');
            setShowSuccessBox(true);
            fetchInstructorProfile(); // Refresh the instructor data after updating
          } catch (error) {
            console.error('Error updating instructor profile:', error);
          }
        }
      );
    } else {
      // If no new image, just update the profile
      try {
        await axios.put('http://localhost:5000/api/instructorProfile/update', instructor);
        setShowSuccessBox(true);
        fetchInstructorProfile(); // Refresh the instructor data after updating
      } catch (error) {
        console.error('Error updating instructor profile:', error);
      }
    }

    setShowConfirmation(false);
  };

  // Handle cancel/resetting the form
  const handleCancel = () => {
    setInstructor(initialInstructor); // Reset all fields to the initial state
    setSelectedImage(null); // Clear the selected image
    setImagePreview(''); // Clear the image preview
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInstructor((prevState) => ({
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
    fetchInstructorProfile(); // Fetch instructor profile on component mount
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
              src={imagePreview || instructor.avatar || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'}
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
            {instructor.firstName} {instructor.lastName}
          </h2>
          <p className="mt-2 text-gray-500">{instructor.email}</p>
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
                value={instructor.firstName || ''}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Last Name</label>
              <input
                type="text"
                name="lastName"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
                value={instructor.lastName || ''}
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
                disabled // Make email read-only
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
              <label className="block text-sm font-medium text-gray-700">Qualifications</label>
              <input
                type="text"
                name="qualifications"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
                value={instructor.qualifications || ''}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Bio</label>
              <textarea
                name="bio"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
                value={instructor.bio || ''}
                onChange={handleChange}
                rows="4"
              ></textarea>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-between">
          <button
            onClick={handleOpenConfirmation}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500"
          >
            Save Changes
          </button>
          <button
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstructorProfile;
