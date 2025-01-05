import React, { useEffect, useState, useRef } from 'react';
import { ChevronLeftIcon } from '@heroicons/react/20/solid';
import { Link, useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';
import { useSelector, useDispatch } from 'react-redux';
import { setCourseData, resetCourseData } from '../../redux/courseSlice';
import { storage } from '../../firebase';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { XMarkIcon } from '@heroicons/react/20/solid';
import axios from 'axios';
import useCancelConfirmation from '../../hooks/useCancelConfirmation';
import useSuccessMessage from '../../hooks/useSuccessMessage';

const CreateCourseThird = () => {
  const { triggerSuccess, successBox } = useSuccessMessage();
  const { triggerCancel, confirmationBox } = useCancelConfirmation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  

  const formData = useSelector((state) => state.course);
  console.log(currentUser._id);

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
  }, [formData.introImage]);

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
      // Upload intro image to Firebase Storage
      const storage = getStorage();
      const file = formData.introImage; // Retrieve the original file from Redux
      if (!file) throw new Error("No image file selected.");
  
      const storageRef = ref(storage, `introImages/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file); // Upload the original file
  
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
        },
        (error) => {
          console.error('Error uploading image:', error);
          throw error;
        },
        async () => {
          // Get the download URL of the uploaded image
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          console.log('File available at', downloadURL);
  
          // Now submit the form data with the Firebase image URL
          const response = await axios.post('http://localhost:5000/api/course/add', {
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
            introImage: downloadURL, // Firebase URL
            introVideo: videoLink, // Video link from state
            reference: externalLinks, // External links from state
            courseMaterial: formData.courseMaterial,
            playlist: formData.playlist,
            instructor: currentUser._id, // Instructor ID from currentUser
          });
  
          console.log('Course created successfully:', response.data);
          triggerSuccess('Completed!', 'New course created successfully');
          dispatch(resetCourseData());
          setTimeout(() => {            
            navigate('/instructor/create-course'); 
          }, 3000);
        }
      );
    } catch (error) {
      console.error('Error creating course:', error);
    }
  };
  
  const handleBack = () => {
    console.log(formData);
    navigate('/instructor/create-course-second');
  }

  return (
    <AdminLayout>
      <div className="px-4 sm:px-8 md:px-12 lg:px-24 py-4">
        {successBox}
        {confirmationBox}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-semibold">Step 03</h1>
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
                    {/* Cross Mark to Remove Image */}
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute top-0 right-0 bg-red-600 text-white rounded-full p-1"
                    >
                      <XMarkIcon className="h-5 w-5" /> {/* Beautiful red X icon */}
                    </button>
                  </div>
                ) : (
                  <input
                    ref={fileInputRef} // Reference the file input
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
                className="col-span-3 p-2 border border-slate-200 rounded-lg w-full"
              />              
            </div>

            {/* External Links */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <label className="col-span-1 self-center">Links to External Resources:</label>
              <div className="col-span-3 space-y-4">
                {externalLinks.map((link, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <input
                      type="text"
                      value={link}
                      onChange={(e) => handleExternalLinkChange(index, e.target.value)}
                      className="p-2 border border-slate-200 rounded-lg w-full"
                      placeholder={`Resource link #${index + 1}`}
                    />
                    <button
                      type="button"
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleRemoveLink(index)}
                    >
                      <XMarkIcon className="h-5 w-5" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="text-blue-500 hover:text-blue-700 font-semibold"
                  onClick={handleAddLink}
                >
                  + Add another link
                </button>
              </div>
            </div>


            {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <label className="col-span-1 self-center">Embed Media:</label>
              <Link to={'/instructor/add-videos'}>
                <button
                  type="button"
                  className="col-span-3 p-2 border border-slate-200 rounded-lg bg-slate-400 hover:opacity-85 text-white font-semibold"
                >
                  Upload
                </button>
              </Link>
            </div> */}
          </form>
        </div>
        <button
          type="button"
          className="flex mt-8 justify-center w-full  p-2 border border-slate-200 rounded-lg bg-blue-900 hover:opacity-85 text-white font-semibold"
          onClick={handleSubmit}
        >
          Create Course
        </button>

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

export default CreateCourseThird;