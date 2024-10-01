import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';
import { storage } from '../../firebase.js'; // Assuming firebase.js is in src/
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const CreateNotice = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: null,
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false); // For image upload status
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Get the first file only
    setFormData((prevFormData) => ({
      ...prevFormData,
      image: file, // Set the selected file
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.image) {
      setError('Please upload an image.');
      return;
    }

    // Upload image to Firebase Storage
    const imageRef = ref(storage, `notices/${formData.image.name}`);
    const uploadTask = uploadBytesResumable(imageRef, formData.image);

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
        // On successful upload, get the download URL
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        
        // Prepare form data to send to the backend, including image URL
        const noticeData = {
          title: formData.title,
          description: formData.description,
          imageUrl: downloadURL, // Send the image URL
        };

        try {
          setLoading(true);
          const res = await fetch(`${API_BASE_URL}/api/notices/add`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(noticeData), // Send JSON object instead of FormData
          });

          const data = await res.json();
          if (!res.ok) {
            setError(data.message || 'Something went wrong');
            setLoading(false);
            return;
          }

          setLoading(false);
          setError(null);
          navigate('/instructor/notice-management'); // Redirect after successful creation
        } catch (err) {
          setLoading(false);
          setError(err.message || 'An error occurred while submitting the form');
        }
      }
    );
  };

  const handleCancel = () => {
    navigate('/instructor/notice-management');
  };

  return (
    <AdminLayout>
      <div className="px-4 sm:px-8 md:px-12 lg:px-24 py-4">
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1
              className="text-xl md:text-xl lg:text-xl p-2 font-bold text-white rounded-lg"
              style={{ background: 'linear-gradient(to left, #D16262, #C53B3B)' }}
            >
              Create Notices
            </h1>
            <button
              className="border p-2 bg-red-600 text-white font-medium rounded-lg"
              onClick={handleCancel}
            >
              Cancel Process
            </button>
          </div>

          {error && <p className="text-red-500">{error}</p>}
          {loading && <p className="text-blue-500">Submitting notice...</p>}
          {imageUploading && <p className="text-blue-500">Uploading image...</p>}

          <form className="space-y-6 mt-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 gap-4 pb-4">
              <label className="col-span-1 whitespace-nowrap">Title:</label>
              <input
                type="text"
                id="title"
                className="col-span-3 p-2 border border-slate-200 rounded-lg w-full"
                onChange={handleChange}
                value={formData.title}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 gap-4 pb-4">
              <label className="col-span-1 self-center">Image:</label>
              <input
                type="file"
                id="image"
                accept=".jpg,.jpeg,.png"
                className="col-span-3 p-2 border border-slate-200 rounded-lg w-full"
                onChange={handleFileChange}
              />
            </div>

            {formData.image && (
              <div className="flex justify-center mt-4">
                <img
                  src={URL.createObjectURL(formData.image)}
                  alt="uploaded"
                  className="h-24 w-24 object-cover"
                />
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 gap-4 pb-4 mt-6">
              <label className="col-span-1 whitespace-nowrap">Description:</label>
              <textarea
                id="description"
                className="col-span-3 p-2 border border-slate-200 rounded-lg w-full"
                onChange={handleChange}
                value={formData.description}
              />
            </div>

            <button
              type="submit"
              className="flex justify-center p-2 border border-slate-200 rounded-lg bg-blue-900 hover:opacity-85 text-white font-semibold mx-auto mt-6"
              disabled={imageUploading || loading}
            >
              <span className="mx-2">{imageUploading || loading ? 'Submitting...' : 'Create Notice'}</span>
            </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default CreateNotice;
