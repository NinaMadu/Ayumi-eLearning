import React, { useEffect, useState, useRef } from 'react';
import { ChevronLeftIcon } from '@heroicons/react/20/solid';
import { Link, useNavigate, useParams } from 'react-router-dom';
import AdminLayout from '../../../components/AdminLayout';
import { useSelector, useDispatch } from 'react-redux';
import { setCourseData, resetCourseData } from '../../../redux/courseSlice';
import { storage } from '../../../firebase';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { XMarkIcon } from '@heroicons/react/20/solid';
import axios from 'axios';
import useCancelConfirmation from '../../../hooks/useCancelConfirmation';
import useSuccessMessage from '../../../hooks/useSuccessMessage';


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const CourseEditThird = () => {
  const { triggerSuccess, successBox } = useSuccessMessage();
  const { triggerCancel, confirmationBox } = useCancelConfirmation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const formData = useSelector((state) => state.course);
    const { courseId } = useParams();
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const [videoLink, setVideoLink] = useState(formData.introVideo || '');
  const [externalLinks, setExternalLinks] = useState(Array.isArray(formData.reference) ? formData.reference : ['']);

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleVideoLinkChange = (e) => {
    const link = e.target.value;
    setVideoLink(link);
    dispatch(setCourseData({ introVideo: link })); // Update Redux store
  };

  useEffect(() => {
    // Check if formData.introImage is a File
    if (formData.introImage && formData.introImage instanceof File) {
      setImagePreview(URL.createObjectURL(formData.introImage)); // Load image from Redux
    } else if (typeof formData.introImage === 'string') {
      // If formData.introImage is a URL string, use it directly
      setImagePreview(formData.introImage);
    }
    setVideoLink(formData.introVideo || ''); // Set existing video link
    setExternalLinks(Array.isArray(formData.reference) ? formData.reference : ['']);
  }, [formData]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    dispatch(setCourseData({ [id]: value }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files && e.target.files[0]; // Get the first file
    if (file) {
      const base64Image = await convertToBase64(file); // Convert image to base64 for preview
      setImagePreview(base64Image); // Set the base64 image preview
      dispatch(setCourseData({ introImage: file })); // Save the original file to Redux
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null); // Remove preview
    dispatch(setCourseData({ introImage: null })); // Remove from Redux
  };

  // Handle external link change
  const handleExternalLinkChange = (index, value) => {
    const updatedLinks = [...externalLinks];
    updatedLinks[index] = value;
    setExternalLinks(updatedLinks);
    dispatch(setCourseData({ reference: updatedLinks }));
  };

  // Add a new external link input
  const handleAddLink = () => {
    setExternalLinks([...externalLinks, '']);
  };

  // Remove an external link
  const handleRemoveLink = (index) => {
    const updatedLinks = externalLinks.filter((_, i) => i !== index);
    setExternalLinks(updatedLinks);
    dispatch(setCourseData({ reference: updatedLinks }));
  };

  const handleImageUpload = async (formData, newImageFile) => {
    const storage = getStorage();
    let introImageUrl = formData.introImage; // Keep the existing URL
  
    try {
      // Check if a new image is selected
      if (newImageFile) {
        // If there's an old image, delete it from Firebase
        if (formData.introImage) {
          const oldImageRef = ref(storage, `introImages/${formData.introImage.split('/').pop()}`);
          await deleteObject(oldImageRef).catch((error) => {
            console.error("Error deleting old image:", error);
          });
        }
  
        // Upload the new image to Firebase
        const newImageRef = ref(storage, `introImages/${newImageFile.name}`);
        await uploadBytes(newImageRef, newImageFile);
  
        // Get the download URL for the new image
        introImageUrl = await getDownloadURL(newImageRef);
      }
  
      // Update formData with the new or existing image URL
      formData.introImage = introImageUrl;
  
      // Further process the form data (e.g., send to the backend)
      console.log("Form data updated:", formData);
    } catch (error) {
      console.error("Error handling image upload:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!currentUser) {
      console.error('No user found, Please log in.');
      return;
    }
  
    try {
      let downloadURL = formData.introImage;
  
      // Check if introImage is a file or a Firebase URL
      if (formData.introImage instanceof File) {
        // It's a file, upload it to Firebase Storage
        const storage = getStorage();
        const file = formData.introImage;
  
        const storageRef = ref(storage, `introImages/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
  
        await new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log('Upload is ' + progress + '% done');
            },
            (error) => {
              console.error('Error uploading image:', error);
              reject(error);
            },
            async () => {
              try {
                downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                console.log('File available at', downloadURL);
                resolve();
              } catch (error) {
                reject(error);
              }
            }
          );
        });
      } else if (typeof formData.introImage === "string") {
        // It's already a Firebase URL, use it as is
        console.log('Using existing Firebase URL:', formData.introImage);
      } else {
        throw new Error("Invalid introImage format.");
      }
  
      // Now submit the form data with the correct downloadURL
      await submitForm(downloadURL);
    } catch (error) {
      console.error('Error editing course:', error);
    }
  };
  
  
  // Function to submit the form data
  const submitForm = async (downloadURL) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/api/course/${courseId}`, {
        courseId: formData._id, // Use the course ID for the update
        title: formData.title,
        description: formData.description,
        category: formData.category,
        difficulty: formData.difficulty,
        prerequisites: formData.prerequisites,
        objectives: formData.objectives,
        customDuration: formData.custom_duration,
        durationUnit: formData.duration,
        enrollmentOptions: formData.enroll,
        customPrice: formData.custom_price,
        priceUnit: formData.price,
        visibility: formData.visibility,
        introImage: downloadURL, // Firebase URL (could be existing URL if no new image)
        introVideo: videoLink, // Video link from state
        reference: externalLinks, // External links from state
        courseMaterial: formData.courseMaterial,
        playlist: formData.playlist,
        instructor: currentUser._id, // Instructor ID from currentUser
      });
  
      console.log('Course edited successfully:', response.data);
      triggerSuccess('Completed!', 'Course updated successfully');
      dispatch(resetCourseData());
      setTimeout(() => {
        navigate('/instructor/create-course');
      }, 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleBack = () => {
    navigate(`/instructor/edit-course-second/${courseId}`, { state: formData });
  }

  return (
    <AdminLayout>
      <div className="px-4 sm:px-8 md:px-12 lg:px-24 py-4">
        {successBox}
        {confirmationBox}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-semibold">Edit Course - Step 03</h1>
          <button
            className="border p-2 bg-red-700 hover:bg-red-600 text-white font-medium rounded-lg"
            onClick={triggerCancel}
          >
            Cancel Process
          </button>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <div>
            <h1 className="mb-6 text-xl font-medium border-2 rounded-lg p-3 text-white justify-center flex"
              style={{ background: 'linear-gradient(to right, #D16262, #C53B3B)' }}>
              Media and Resources
            </h1>
          </div>
          <form className="space-y-6 mt-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <label className="col-span-1 self-center">Course Introduction Image:</label>
              <div className="col-span-3 flex items-center space-x-4">
                {imagePreview ? (
                  <div className="relative">
                    <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded-lg" />
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute top-0 right-0 bg-red-600 text-white rounded-full p-1"
                    >
                      <XMarkIcon className="h-5 w-5" />
                    </button>
                  </div>
                ) : (
                  <input
                    ref={fileInputRef}
                    type="file"
                    id="introImage"
                    accept=".jpg,.jpeg,.png"
                    className="p-2 border border-slate-200 rounded-lg w-full"
                    onChange={handleImageChange}
                  />
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <label className="col-span-1 self-center">Course Introduction Video:</label>
              <div className="col-span-3 flex flex-col">
                <input
                  type="text"
                  value={videoLink}
                  onChange={handleVideoLinkChange}
                  placeholder="Paste YouTube video link here"
                  className="p-2 border border-slate-200 rounded-lg w-full"
                />
                <a
                  href="https://www.youtube.com/upload"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 text-blue-500 hover:underline"
                >
                  Upload Video to YouTube
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <label className="col-span-1 self-center">Upload Course Materials:</label>
              <input
                type="file"
                id="courseMaterial"
                accept=".jpg,.jpeg,.png,.gif,.pdf"
                multiple
                className="col-span-3 p-2 border border-slate-200 rounded-lg"
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <label className="col-span-1 self-center">External Resources:</label>
              <div className="col-span-3">
                {externalLinks.map((link, index) => (
                  <div className="flex items-center space-x-4 mb-3" key={index}>
                    <input
                      type="text"
                      value={link}
                      onChange={(e) => handleExternalLinkChange(index, e.target.value)}
                      placeholder="Add an external link"
                      className="p-2 border border-slate-200 rounded-lg w-full"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveLink(index)}
                      className="bg-red-500 text-white rounded-full p-2"
                    >
                      <XMarkIcon className="h-5 w-5" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddLink}
                  className="text-blue-600"
                >
                  + Add another link
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center mt-6">
              <button
                type="button"
                onClick={handleBack}
                className="bg-gray-600 text-white px-6 py-2 rounded-lg"
              >
                <ChevronLeftIcon className="w-5 h-5 mr-2" />
                Back
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg"
              >
                Update Course
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default CourseEditThird;
