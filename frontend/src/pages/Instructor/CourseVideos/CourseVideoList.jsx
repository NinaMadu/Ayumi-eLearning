import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminLayout from '../../../components/AdminLayout';
import { Link } from 'react-router-dom';
import axios from 'axios';



const API_BASE_URL  = import.meta.env.VITE_API_BASE_URL;


const CourseVideoList = () => {
    const { courseId } = useParams();
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();


    useEffect(()=>{
        fetchCourseVideos();
    },[courseId]);

    const fetchCourseVideos = async ()=>{
        try{
         const response = await axios.get(`${API_BASE_URL}/api/courses/${courseId}/videos`);
         setVideos(response.data.videos);  
         console.log(response.data.videos); 
        }   
        catch(error){
            console.error('Error fetching course videos:', error);
        }
    }

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
            
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Lessons of the Course</h1>
                    <Link to="/instructor/add-videos" state={{ courseId }}>
                        <button
                            type="button"
                            className="col-span-3 p-2 border border-slate-200 rounded-lg bg-slate-400 hover:opacity-85 text-white font-semibold"
                        >
                            Add New Lessons
                        </button>
                    </Link>
                </div>

            <div
                style={{
                    display: 'grid',
                    gap: '1.5rem',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    padding: '2rem',
                }}
            >
                {videos.map((video) => (
                    <div
                        style={{
                            backgroundColor: '#fff',
                            borderRadius: '10px',
                            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                            overflow: 'hidden',
                            transition: 'transform 0.3s ease, boxShadow 0.3s ease',
                        }}
                        key={video._id}
                    >
                        <img
                            src={video.thumbnailUrl}
                            alt="Video Thumbnail"
                            onClick={() => {
                                navigate(`/instructor/videoPreview/${video.videoId}`);
                               
                            }}
                            style={{
                                cursor: 'pointer',
                                width: '100%',
                                height: '150px',
                                objectFit: 'cover',
                            }}
                        />
                        <div
                            style={{
                                padding: '1rem',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.5rem',
                            }}
                        >
                            <h3
                                style={{
                                    fontSize: '1.2rem',
                                    color: '#333',
                                }}
                            >
                                {video.title}
                            </h3>
                            <p
                                style={{
                                    fontSize: '0.9rem',
                                    color: '#666',
                                }}
                            >
                                {video.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </AdminLayout>
    );
}
export default CourseVideoList;
