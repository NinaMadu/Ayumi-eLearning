import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
// import { storage } from '../../../firebase.js';
// import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import SuccessBox from '../../../components/SuccessBox.jsx';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function VideoUpload() {
  const location = useLocation();
  const { courseId } = location.state;
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    thumbnailUrl: '',
    videoId: ''
  });
  const [error, setError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [thumbnailUploaded, setThumbnailUploaded] = useState(false);
  const [showSuccessBox, setShowSuccessBox] = useState(false);

  const handleInputChange = (e) => {
    const { id, value, files } = e.target;
    if (id === 'thumbnail') {
      setThumbnailFile(files[0]);
    } else if (id === 'video') {
      setVideoFile(files[0]);
    } else {
      setFormData((prev) => ({
        ...prev,
        [id]: value,
      }));
    }
  };

  const handleSubmit = async () => {
    if (thumbnailFile && videoFile) {
      setUploading(true);
      const formData = new FormData();
      formData.append('title', formData.title);
      formData.append('description', formData.description);
      formData.append('courseId', courseId);
      formData.append('thumbnail', thumbnailFile);
      formData.append('video', videoFile);

      try {
        const response = await axios.post(`${API_BASE_URL}/api/videoUpload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setProgress(percentCompleted);
          },
        });

        setUploading(false);
        setShowSuccessBox(true);
      } catch (error) {
        console.error('Upload error:', error);
        setError('Failed to upload files');
        setUploading(false);
      }
    } else {
      setError('Both thumbnail and video files are required');
    }
  };

  return (
    <div className="container px-4 mx-auto">
      {showSuccessBox && (
        <SuccessBox
          title="Upload Successful!"
          message="Your video has been uploaded successfully."
          onClose={() => setShowSuccessBox(false)}
        />
      )}
      <div className="px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md">
        <h1 className="mb-4 text-xl font-semibold">Upload Videos from Here</h1>
        <form>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-semibold text-gray-700" htmlFor="title">
              Title:
            </label>
            <input
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="title"
              type="text"
              value={formData.title}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-semibold text-gray-700" htmlFor="description">
              Description:
            </label>
            <textarea
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="description"
              onChange={handleInputChange}
              value={formData.description}
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-semibold text-gray-700" htmlFor="thumbnail">
              Thumbnail:
            </label>
            <input
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="thumbnail"
              type="file"
              onChange={handleInputChange}
            />
            {thumbnailUploaded && (
              <div className="flex items-center mt-2 text-green-600">
                <span>✔ Thumbnail Uploaded Successfully</span>
              </div>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-semibold text-gray-700" htmlFor="video">
              Upload video:
            </label>
            <input
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="video"
              type="file"
              onChange={handleInputChange}
            />
            {uploading && (
              <div className="mt-4">
                <p className="text-sm text-gray-700">Uploading Video: {progress}%</p>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button
              type="button"
              className="flex justify-center w-full p-2 mt-8 font-semibold text-white bg-blue-900 border rounded-lg border-slate-200 hover:opacity-85"
              onClick={handleSubmit}
              disabled={uploading}
            >
              {uploading ? 'Uploading...' : 'Publish Video'}
            </button>
          </div>
        </form>
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
}