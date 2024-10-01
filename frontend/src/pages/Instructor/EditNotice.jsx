import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';
import { storage } from '../../firebase.js';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const EditNotice = () => {
  const { id } = useParams(); // Get notice ID from URL params
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: null,
    imageUrl: '', // To hold existing image URL
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // Fetch existing notice data when component loads
  useEffect(() => {
    const fetchNotice = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/notices/${id}`);
        const data = await res.json();
        if (res.ok) {
          setFormData({
            title: data.notice.title,
            description: data.notice.description,
            imageUrl: data.notice.image, // Set the existing image URL
            image: null, // Will be updated only if a new image is uploaded
          });
        } else {
          setError(data.message || 'Error fetching notice');
        }
      } catch (err) {
        setError(err.message || 'An error occurred while fetching the notice');
      }
    };

    fetchNotice();
  }, [id, API_BASE_URL]);

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

    if (formData.image) {
      // If a new image is uploaded, handle the upload to Firebase
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
          
          // Prepare form data to send to the backend
          updateNotice(downloadURL); // Send the image URL
        }
      );
    } else {
      // If no new image is uploaded, use the existing image URL
      updateNotice(formData.imageUrl);
    }
  };

  const updateNotice = async (imageUrl) => {
    const noticeData = {
      title: formData.title,
      description: formData.description,
      imageUrl, // Use the new or existing image URL
    };

    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/api/notices/${id}`, {
        method: 'PUT', // Use PUT method to update the notice
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(noticeData),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'Something went wrong');
        setLoading(false);
        return;
      }

      setLoading(false);
      setError(null);
      navigate('/instructor/notice-management'); // Redirect after successful update
    } catch (err) {
      setLoading(false);
      setError(err.message || 'An error occurred while updating the notice');
    }
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
              Edit Notice
            </h1>
            <button
              className="border p-2 bg-red-600 text-white font-medium rounded-lg"
              onClick={handleCancel}
            >
              Cancel Process
            </button>
          </div>

          {error && <p className="text-red-500">{error}</p>}
          {loading && <p className="text-blue-500">Updating notice...</p>}
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

            {formData.imageUrl && !formData.image && (
              <div className="flex justify-center mt-4">
                <img
                  src={formData.imageUrl}
                  alt="notice"
                  className="h-24 w-24 object-cover"
                />
              </div>
            )}

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
              <span className="mx-2">{imageUploading || loading ? 'Updating...' : 'Update Notice'}</span>
            </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default EditNotice;
