import React, { useEffect, useState, useRef } from 'react';
import { ChevronLeftIcon, XMarkIcon, PlusIcon } from '@heroicons/react/20/solid';
import { Link, useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';
import { useSelector, useDispatch } from 'react-redux';
import { setCourseData, resetCourseData } from '../../redux/courseSlice';
import { storage } from '../../firebase';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import FileUpload from '../../components/FileUpload';


const CreateCourseThird = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formData = useSelector((state) => state.course);

  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const [videoLink, setVideoLink] = useState(formData.introVideo || '');
  const [externalLinks, setExternalLinks] = useState(formData.externalLinks || ['']);

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



  const handleUploadImage = () => {

  };


  useEffect(() => {
    if (formData.introImage && formData.introImage instanceof File) {
      setImagePreview(URL.createObjectURL(formData.introImage));
    } else if (typeof formData.introImage === 'string') {
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
      const base64Image = await convertToBase64(file); // Convert image to base64
      setImagePreview(base64Image); // Set the preview
      dispatch(setCourseData({ introImage: base64Image })); // Save to Redux as base64

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ''; // Clear the file input
      }
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null); // Remove preview
    dispatch(setCourseData({ introImage: null })); // Remove from Redux
  };


  const handleAddLink = () => {
    setExternalLinks([...externalLinks, '']); // Add an empty string to the array
  };

  // Handle remove link input field
  const handleRemoveLink = (index) => {
    const updatedLinks = externalLinks.filter((_, i) => i !== index); // Remove the link at the given index
    setExternalLinks(updatedLinks);
    dispatch(setCourseData({ externalLinks: updatedLinks })); // Update Redux store
  };

  // Handle input change for links
  const handleLinkChange = (index, value) => {
    const updatedLinks = [...externalLinks];
    updatedLinks[index] = value; // Update the specific link
    setExternalLinks(updatedLinks);
    dispatch(setCourseData({ externalLinks: updatedLinks })); // Update Redux store
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);


  };

  const handleCancel = () => {
    dispatch(resetCourseData());
  };

  const handleBack = () => {
    console.log(formData);
    navigate('/instructor/create-course-second');
  }

  return (
    <AdminLayout>
      <div className="px-4 sm:px-8 md:px-12 lg:px-24 py-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-semibold">Step 03</h1>
          <button
            className="border p-2 bg-red-600 text-white font-medium rounded-lg"
            onClick={handleCancel}
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

            {/* External Links */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <label className="col-span-1 self-center">Links to External Resources:</label>
              <div className="col-span-3">
                {externalLinks.map((link, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-2">
                    <input
                      type="text"
                      value={link}
                      onChange={(e) => handleLinkChange(index, e.target.value)}
                      className="p-2 border border-slate-200 rounded-lg w-full"
                      placeholder="Enter resource link"
                    />
                    <button
                      type="button"
                      className="bg-red-600 text-white p-1 rounded-full"
                      onClick={() => handleRemoveLink(index)}
                    >
                      <XMarkIcon className="h-5 w-5" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="mt-2 flex items-center text-blue-500 hover:underline"
                  onClick={handleAddLink}
                >
                  <PlusIcon className="h-5 w-5 mr-1" /> Add another link
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <label className="col-span-1 self-center">Upload Course Materials:</label>
              < FileUpload />
              
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <label className="col-span-1 self-center">Embed Media:</label>
              <Link to={'/instructor/add-videos'}>
                <button
                  type="button"
                  className="col-span-3 p-2 border border-slate-200 rounded-lg bg-slate-400 hover:opacity-85 text-white font-semibold"
                >
                  Upload
                </button>
              </Link>
            </div>
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
