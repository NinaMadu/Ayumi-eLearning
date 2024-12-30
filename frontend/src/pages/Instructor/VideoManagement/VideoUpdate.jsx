import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminLayout from '../../../components/AdminLayout';
import SuccessBox from '../../../components/SuccessBox';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../../firebase';


export default function VideoUpdate() {
  const { videoId } = useParams();
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    thumbnailUrl: '',
  });

  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [newThumbnailUrl, setNewThumbnailUrl] = useState('');
  const [oldThumbnailUrl, setOldThumbnailUrl] = useState('');
  const [showSuccessBox, setShowSuccessBox] = useState(false);
  const [error, setError] = useState('');
  const [thumbnailUploaded, setThumbnailUploaded] = useState(false);

  useEffect(() => {
    fetchVideoDetails();
  }, [videoId]);

  const fetchVideoDetails = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/video/${videoId}`);
      const video = response.data.video;
      setFormData({
        title: video.title,
        description: video.description,
        thumbnailUrl: video.thumbnailUrl,
      });
      setOldThumbnailUrl(video.thumbnailUrl);
    } catch (error) {
      console.error('Error fetching video details:', error);
      setError('Failed to load video details. Please try again.');
    }
  };

  const handleInputChange = (e) => {
    const { id, value, files } = e.target;
    if (id === 'thumbnail') {
      setThumbnailFile(files[0]);
      setThumbnailUploaded(true);
      
    } else {
      setFormData((prev) => ({ ...prev, [id]: value }));
    }
  };

  const handleUploadThumbnail = (file) => {
    
          if(!file)
          {
              console.error("No file was provided for upload");
              return;
          }
  
          const fileName = `${new Date().getTime()}-${file.name}`; 
          // console.log("File name: ", fileName);
          const storageRef = ref(storage, `uploads/${fileName}`);
          const uploadTask = uploadBytesResumable(storageRef, file);
  
          return new Promise((resolve, reject) => {
              uploadTask.on('state_changed',
                  (snapshot) => {
                      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                      console.log(`Upload is ${progress}% done`);
                  },
                  (error)=>{
                      console.error("Upload failed", error);
                      reject(error);
                  },
                  
                  () => {
                      getDownloadURL(uploadTask.snapshot.ref)
                      .then((url)=>{
                              console.log("Thumbnail URL: ", url);
                              setNewThumbnailUrl(url);
                              setThumbnailUploaded(true);
                              resolve(url);
                      })
                      .catch((error)=>{
                          console.error("Failed to get download URL", error);
                          reject(error);
                      });
                  }
              );
          });
      };
  

  const handleSubmit = async () => {
    try {    

      let updatedData = {
       ...formData,
      };

      if(thumbnailFile)
      {
        const uploadedThumbnailUrl = await handleUploadThumbnail(thumbnailFile);
        updatedData = {
          ...updatedData,
          newThumbnailUrl: uploadedThumbnailUrl,          
        };
      }

      await axios.put(`${API_BASE_URL}/api/videoUpdate/${videoId}`, updatedData);

      setShowSuccessBox(true);
      setTimeout(() => navigate(`/instructor/videoPreview/${videoId}`), 2000);
    } catch (error) {
      console.error('Error updating video:', error);
      setError('Failed to update the video. Please try again.');
    }
  };

  return (
    <AdminLayout>
      <div className="container px-4 mx-auto">
        {showSuccessBox && (
          <SuccessBox
            title="Update Successful!"
            message="Your video details have been updated successfully."
            onClose={() => setShowSuccessBox(false)}
          />
        )}

        <div className="px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md">
          <h1 className="mb-4 text-xl font-semibold">Update Video Details</h1>
          <form>
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-semibold text-gray-700"
                htmlFor="title"
              >
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
              <label
                className="block mb-2 text-sm font-semibold text-gray-700"
                htmlFor="description"
              >
                Description:
              </label>
              <textarea
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="description"
                value={formData.description}
                onChange={handleInputChange}
              ></textarea>
            </div>

            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-semibold text-gray-700"
                htmlFor="thumbnail"
              >
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

            <div className="flex items-center justify-between">
              <button
                type="button"
                className="flex justify-center w-full p-2 mt-8 font-semibold text-white bg-blue-900 border rounded-lg border-slate-200 hover:opacity-85"
                onClick={handleSubmit}
              >
                Update Video Details
              </button>
            </div>
          </form>
          {error && <p className="text-red-500">{error}</p>}
        </div>
      </div>
    </AdminLayout>
  );
}
