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

const CourseEditThird = () => {
  const { triggerSuccess, successBox } = useSuccessMessage();
  const { triggerCancel, confirmationBox } = useCancelConfirmation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  
  const { courseId } = useParams(); // Get courseId from URL params
  const formData = useSelector((state) => state.course);

  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const [videoLink, setVideoLink] = useState(formData.introVideo || '');
  const [externalLinks, setExternalLinks] = useState(Array.isArray(formData.reference) ? formData.reference : ['']);

  useEffect(() => {
    // Fetch existing course data when the component mounts
    const fetchCourseData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/course/${courseId}`);
        const course = response.data;

        // Pre-fill Redux store with fetched course data
        dispatch(setCourseData(course));

        // Set the image preview if course has an image URL
        if (course.introImage) {
          setImagePreview(course.introImage);
        }
        
        // Set external links if available
        if (course.reference && Array.isArray(course.reference)) {
          setExternalLinks(course.reference);
        }

        // Set the video link
        setVideoLink(course.introVideo || '');
      } catch (error) {
        console.error('Error fetching course data:', error);
      }
    };

    fetchCourseData();
  }, [courseId, dispatch]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!currentUser) {
      console.error('No user found, Please log in.');
      return;
    }
  
    try {
      // Upload intro image to Firebase Storage if it's changed
      let downloadURL = formData.introImage;
      if (formData.introImage instanceof File) {
        const storageRef = ref(storage, `introImages/${formData.introImage.name}`);
        const uploadTask = uploadBytesResumable(storageRef, formData.introImage);

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
          },
          (error) => {
            console.error('Error uploading image:', error);
            throw error;
          },
          async () => {
            downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            console.log('File available at', downloadURL);
          }
        );
      }

      // Now submit the updated course data
      const response = await axios.put(`http://localhost:5000/api/course/update/${courseId}`, {
        ...formData,
        introImage: downloadURL, // Firebase URL if image is changed
        introVideo: videoLink, // Video link from state
        reference: externalLinks, // External links from state
        instructor: currentUser._id, // Instructor ID from currentUser
      });

      console.log('Course updated successfully:', response.data);
      triggerSuccess('Completed!', 'Course updated successfully');
      dispatch(resetCourseData());

      setTimeout(() => {
        navigate('/instructor/dashboard'); 
      }, 3000);
    } catch (error) {
      console.error('Error updating course:', error);
    }
  };

  const handleBack = () => {
    navigate('/instructor/create-course-second');
  };

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
            {/* Similar fields as Create Course Third, just pre-fill the values */}
            {/* Image, Video Link, Course Materials, External Links */}
            {/* The rest of the form remains the same */}
            <button
              type="button"
              className="flex mt-8 justify-center w-full p-2 border border-slate-200 rounded-lg bg-blue-900 hover:opacity-85 text-white font-semibold"
              onClick={handleSubmit}
            >
              Update Course
            </button>
          </form>
        </div>

        <div className="flex justify-between mt-6">
          <button onClick={handleBack}>
            <div className="bg-gray-400 text-white p-2 rounded-full shadow-lg">
              <div className='flex items-center pl-2'>
                <p className="mr-2">Back</p>
                <ChevronLeftIcon className="h-6 w-6" />
              </div>
            </div>
          </button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default CourseEditThird;
