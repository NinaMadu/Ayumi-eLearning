import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AdminLayout from '../../../components/AdminLayout';
import { Link } from 'react-router-dom';

const CourseVideoList = () => {
  const { courseId } = useParams();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchVideos = async () => {
//       try {
//         const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/course/${courseId}/videos`);
//         const data = await res.json();

//         if (res.ok) {
//           setVideos(data.videos);
//           setLoading(false);
//         } else {
//           setError(data.message || 'Failed to fetch videos');
//           setLoading(false);
//         }
//       } catch (err) {
//         setError('Error fetching videos');
//         setLoading(false);
//       }
//     };

//     fetchVideos();
//   }, [courseId]);

//   if (loading) return <p>Loading videos...</p>;
//   if (error) return <p>{error}</p>;

  return (
    <AdminLayout>
      <div className="px-4 py-8 max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Lessons of the Course</h1>
          <Link to={'/instructor/add-videos'}>
                          <button
                            type="button"
                            className="col-span-3 p-2 border border-slate-200 rounded-lg bg-slate-400 hover:opacity-85 text-white font-semibold"
                          >
                            Add New Lessons
                          </button>
                        </Link>
        </div>
        <ul className="space-y-4">
          {videos.map((video) => (
            <li
              key={video._id}
              className="flex items-center bg-white border border-gray-200 rounded-lg shadow p-4"
            >
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{video.title}</h3>
                <p className="text-sm text-gray-500">{video.description}</p>
              </div>
              <button className="text-sm text-white bg-red-500 px-4 py-2 rounded-md hover:bg-red-600">
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </AdminLayout>
  );
};

export default CourseVideoList;
