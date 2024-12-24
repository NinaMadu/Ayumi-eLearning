import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import ConfirmationBox from '../../components/ConfirmationBox.jsx';
import SuccessBox from '../../components/SuccessBox.jsx';

const InstructorProfile = () => {
  const [instructor, setInstructor] = useState({
    name: '',
    email: '',
    qualifications: [],
    bio: '',
    avatar: '', // Profile image
    phone: [], // Array of phone numbers
    experience: [], // Array of experiences
  });

  const [initialInstructor, setInitialInstructor] = useState({}); // Store the initial instructor data to reset
  const [selectedImage, setSelectedImage] = useState(null); // Store selected image
  const [imagePreview, setImagePreview] = useState(''); // Preview selected image
  const currentUser = useSelector((state) => state.user.currentUser); // Get the logged-in user from Redux

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSuccessBox, setShowSuccessBox] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch instructor profile data
  const fetchInstructorProfile = async () => {
    if (currentUser && currentUser.email) {
      try {
        // Fetch the instructor profile based on email
        const response = await axios.get(`http://localhost:5000/api/instructorProfile/${currentUser.email}`);
        setInstructor(response.data);
        setInitialInstructor(response.data); // Set the initial data to reset the form
      } catch (error) {
        console.error('Error fetching instructor profile:', error);
      }
    }
  };

  // Handle image selection for avatar
  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file); // Store selected file
      setImagePreview(URL.createObjectURL(file)); // Create a preview URL for the image
    }
  };

  // Handle input changes in the form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInstructor((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle array changes (e.g., qualifications, experience, phone numbers)
  const handleArrayChange = (e, field) => {
    const { value } = e.target;
    setInstructor((prevState) => ({
      ...prevState,
      [field]: value.split(',').map((item) => item.trim()), // Convert comma-separated input to array
    }));
  };

  // Update the instructor profile
  const handleUpdate = async (e) => {
    e.preventDefault();
    
    let avatarUrl = instructor.avatar; // Default to existing avatar URL unless uploading a new one

    if (selectedImage) {
      // Upload the selected image to Firebase Storage
      const storage = getStorage();
      const storageRef = ref(storage, `avatars/${currentUser.email}`);
      const uploadTask = uploadBytesResumable(storageRef, selectedImage);

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

          try {
            // Update the instructor profile in the backend
            await axios.put('http://localhost:5000/api/instructorProfile/update', { ...instructor, avatar: avatarUrl });

            setSuccessMessage('Profile updated successfully!');
            setShowSuccessBox(true);
            fetchInstructorProfile(); // Refresh instructor profile after update
          } catch (error) {
            console.error('Error updating instructor profile:', error);
          }
        }
      );
    } else {
      // If no new image is selected, just update the profile
      try {
        await axios.put('http://localhost:5000/api/instructorProfile/update', instructor);
        setShowSuccessBox(true);
        fetchInstructorProfile(); // Refresh instructor profile after update
      } catch (error) {
        console.error('Error updating instructor profile:', error);
      }
    }
    setShowConfirmation(false);
  };

  // Handle cancel (reset the form)
  const handleCancel = () => {
    setInstructor(initialInstructor); // Reset instructor profile to initial state
    setSelectedImage(null); // Clear selected image
    setImagePreview(''); // Clear image preview
  };

  // Open confirmation dialog before saving
  const handleOpenConfirmation = () => {
    setShowConfirmation(true);
  };

  // Close confirmation dialog without saving
  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
  };

  // Close success box
  const handleCloseSuccessBox = () => {
    setShowSuccessBox(false);
  };

  useEffect(() => {
    fetchInstructorProfile(); // Fetch instructor profile when the component mounts or when currentUser changes
  }, [currentUser]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      {showSuccessBox && (
        <SuccessBox
          title="Success"
          message="Profile updated successfully!"
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
              alt="Instructor Profile"
            />
            <input
              type="file"
              id="fileInput"
              className="hidden"
              onChange={handleImageSelect} // Trigger image selection
            />
          </label>
          <h2 className="mt-4 text-2xl font-semibold text-gray-700">{instructor.name}</h2>
          <p className="mt-2 text-gray-500">{instructor.email}</p>
        </div>
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-600">Personal Information</h3>
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
                disabled // Make email read-only
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Qualifications</label>
              <input
                type="text"
                name="qualifications"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
                value={instructor.qualifications.join(', ') || ''}
                onChange={(e) => handleArrayChange(e, 'qualifications')}
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
              <label className="block text-sm font-medium text-gray-700">Phone Numbers</label>
              <input
                type="text"
                name="phone"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
                value={instructor.phone.join(', ') || ''}
                onChange={(e) => handleArrayChange(e, 'phone')}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Experience</label>
              <input
                type="text"
                name="experience"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
                value={instructor.experience.join(', ') || ''}
                onChange={(e) => handleArrayChange(e, 'experience')}
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

export default InstructorProfile;
