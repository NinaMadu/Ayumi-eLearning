import React, { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import VideoUpload from './VideoManagement/VideoUpload';
// import VideoUpload from '../../pages/Instructor/VideoUpload';
import { Link } from 'react-router-dom';

export default function AddVideos() {
  
  const [videoUploadCount, setVideoUploadCount] = useState(1);

  
  const handleAddVideo = () => {
    setVideoUploadCount(videoUploadCount + 1); 
  };

  return (
    <AdminLayout>

    <div>

    
      {Array.from({ length: videoUploadCount }, (_, index) => (
        <div key={index}>
          <VideoUpload />
        </div>
      ))}

  
      <div className='flex justify-between '>
     <Link to={'/instructor/create-course-third'} className='p-2 px-4 font-semibold text-white bg-gray-400 rounded-lg shadow-lg'>
      <button>Back to Course</button>
     </Link>

      <button
        onClick={handleAddVideo}
        className="flex px-2 py-2 font-semibold text-white rounded-lg  justify-items-end"
        style={{
          background: 'linear-gradient(to right, #D16262, #C53B3B)',
        }}
      >
        + Add Another Video
      </button>
      </div>
    </div>
    </AdminLayout>
  );
}
