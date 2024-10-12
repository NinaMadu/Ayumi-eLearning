import React, { useEffect, useState } from 'react';
import { ChevronLeftIcon } from '@heroicons/react/20/solid';
import { Link, useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';
import { useSelector, useDispatch } from 'react-redux';
import { setCourseData, resetCourseData } from '../../redux/courseSlice';
import { storage } from '../../firebase';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';

const CreateCourseThird = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formData = useSelector((state) => state.course);
  const [imageUploading, setImageUploading] = useState(false);
  const [error, setError] = useState(null);
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0]; 
    setImage(file); 
  };

  const handleUploadImage = () => {
    if (!image) {
      setError('Please select an image to upload.');
      return;
    }

    const imageRef = ref(storage, `course_images/${image.name}`);
    const uploadTask = uploadBytesResumable(imageRef, image);
    setImageUploading(true);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Optional: you can track progress here if needed
      },
      (err) => {
        setError('Error uploading image: ' + err.message);
        setImageUploading(false);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        dispatch(setCourseData({ introImage: downloadURL })); // Save the URL in Redux
        setImageUploading(false);
        setImage(null); // Reset image state after upload
      }
    );
  };


  useEffect(() => {
    if (formData.introImage) {
      setImage(formData.introImage); // Set image URL if it exists
    }
  }, [formData.introImage]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    dispatch(setCourseData({ [id]: value}));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0]; 
    dispatch(setCourseData({ introImage: file })); 
  };

  const handleRemoveImage = async () => {
    if (formData.introImage) {
      // Extract the image name from the URL
      const imageName = formData.introImage.split('/').pop().split('?')[0]; // Extract just the file name from the URL
      const imageRef = ref(storage, `course_images/${imageName}`);  // Reference to the image in Firebase
  
      try {
        await deleteObject(imageRef);  // Remove the image from Firebase storage
        dispatch(setCourseData({ introImage: null }));  // Update Redux state
        console.log("Image successfully deleted from Firebase.");
      } catch (error) {
        console.error("Error removing image from Firebase:", error);
        setError("Failed to remove the image.");
      }
    }
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    //const courseData = { ...formData};
    console.log('Form submitted:', formData);
    
    // if (!formData.introImage) {
    //   setError('Please upload a course introduction image.');
    //   return;
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
              <input
                type="file"
                id="introImage"
                accept=".jpg,.jpeg,.png" 
                className="col-span-3 p-2 border border-slate-200 rounded-lg w-full"
                onChange={handleImageChange}                
              />
            </div>

            {image ? (
              <div className="relative flex flex-col items-center mt-4">
                <img
                  src={typeof image === 'string' ? image : URL.createObjectURL(image)}
                  alt="Selected"
                  className="h-24 w-24 object-cover"
                />
                <button
                  type="button"
                  className="absolute top-0 right-0 bg-red-600 text-white rounded-full p-1 hover:bg-red-700"
                  onClick={() => setImage(null)}  // Remove the selected image from local state
                >
                  &times;
                </button>
                <button
                  type="button"
                  className="mt-2 p-2 border border-slate-200 rounded-lg bg-blue-900 hover:opacity-85 text-white font-semibold"
                  onClick={handleUploadImage}
                  disabled={imageUploading}
                >
                  {imageUploading ? 'Uploading...' : 'Upload Image'}
                </button>
                {error && <p className="text-red-500 mt-2">{error}</p>}
              </div>
            ) : (
              formData.introImage && (
                <div className="relative flex flex-col items-center mt-4">
                  <img
                    src={formData.introImage}
                    alt="Uploaded"
                    className="h-24 w-24 object-cover"
                  />
                  <button
                    type="button"
                    className="absolute top-0 right-0 bg-red-600 text-white rounded-full p-1 hover:bg-red-700"
                    onClick={handleRemoveImage}  // Trigger image removal
                  >
                    &times;
                  </button>
                </div>
              )
            )}

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <label className="col-span-1 self-center">Course Introduction Video:</label>
              <input
                type="file"
                id="introVideo"
                accept=".mp4" 
                multiple
                className="col-span-3 p-2 border border-slate-200 rounded-lg w-full"
             
                
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <label className="col-span-1 self-center">Links to External Resources:</label>
              <input
                type="text"
                id="reference"
                className="col-span-3 p-2 border border-slate-200 rounded-lg w-full"
                onChange={handleChange}
                value={formData.reference}
              />
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
