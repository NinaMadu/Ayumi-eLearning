import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const API_BASE_URL  = import.meta.env.VITE_API_BASE_URL;


export default function VideoList() {

    const [videos, setVideos] = useState([]);
    const navigate = useNavigate();
    
    useEffect(()=>{
        fetchVideos();
    },[]);

    const fetchVideos = async ()=>{
        try{
            const response = await axios.get(`${API_BASE_URL}/api/videos`);
            console.log(response.data.videos);
            setVideos(response.data.videos);

        }
        catch(error){
            console.error('Error fetching videos:', error);
        }
    };


    const handleThumbnailClick = (videoId)=>{
        navigate(`/instructor/videoPreview/${videoId}`);
    };

  return (
    <div 
    style={{
        display:'grid',
        gap: '1.5rem',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        padding: '2rem',


    }}>
        {/* <div>Hello World</div> */}
        {videos.map((video)=>(
            <div
            style={{
                backgroundColor: '#fff',
                borderRadius:'10px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                overflow: 'hidden',
                // cursor: 'pointer',
                transition: 'transform 0.3s ease, boxShadow 0.3s ease',

            }}
            key={video._id}>
                <img 
                
                src={video.thumbnailUrl} 
                alt="Video Thumbnail"
                onClick={()=>{
                    handleThumbnailClick(video.videoId)
                }}
                style={{
                    cursor:'pointer',
                    width:'100%',
                    height:'150px',
                    objectFit:'cover',

                }}
                />
                <div
                style={{
                    padding: '1rem',
                    display:'flex',
                    flexDirection:'column',
                    gap: '0.5rem',
                }}>

                
                <h3
                style={{
                    fontSize: '1.2rem',
                    color: '#333',
                }}>{video.title}</h3>
                <p
                style={{
                    fontSize:'0.9rem',
                    color: '#666',

                }}>{video.description}</p>
                </div>
            </div>
        ))}
    </div>
  )
}
