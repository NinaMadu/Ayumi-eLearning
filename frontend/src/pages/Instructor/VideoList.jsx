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
    <div>
        <div>Hello World</div>
        {videos.map((video)=>(
            <div key={video._id}>
                <img 
                src={video.thumbnailUrl} 
                alt="Video Thumbnail"
                onClick={()=>{
                    handleThumbnailClick(video.videoId)
                }}
                style={{cursor:'pointer'}}
                />
                <h3>{video.title}</h3>
                <p>{video.description}</p>
            </div>
        ))}
    </div>
  )
}
