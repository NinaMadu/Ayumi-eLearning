import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import UserLayout from '../../../components/UserLayout';

export default function UserVideoPreview() {
  const { videoId } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    fetchVideoData();
  }, [videoId]);

  const fetchVideoData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/video/${videoId}`);
      setTitle(response.data.video.title);
      setDescription(response.data.video.description);
    } catch (error) {
      console.error('Error fetching video data:', error);
      setTitle('Video Not Found');
      setDescription(
        'The requested video is unavailable. Please contact support if the problem persists.'
      );
    }
  };

  return (
    <UserLayout>
    <div
      style={{
        fontFamily: 'Roboto, sans-serif',
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* Video Title */}
      <h1
        style={{
          fontSize: '32px',
          fontWeight: 'bold',
          color: '#333',
          marginBottom: '20px',
          textAlign: 'center',
        }}
      >
        {title}
      </h1>

      {/* Video Player */}
      <div
        style={{
          position: 'relative',
          overflow: 'hidden',
          paddingBottom: '56.25%', // 16:9 aspect ratio
          borderRadius: '10px',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
          marginBottom: '20px',
        }}
      >
        <iframe
          style={{
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            border: 'none',
          }}
          src={`https://player.vimeo.com/video/${videoId}?badge=0&byline=0&title=0&portrait=0`}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      {/* Description Section */}
      <div
        style={{
          backgroundColor: '#fff',
          borderRadius: '8px',
          padding: '15px 20px',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h2
          style={{
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#444',
            marginBottom: '10px',
          }}
        >
          Description
        </h2>
        <p
          style={{
            fontSize: '16px',
            lineHeight: '1.6',
            color: '#555',
            whiteSpace: 'pre-wrap',
            marginBottom: '0',
          }}
        >
          {description}
        </p>
      </div>
    </div>
    </UserLayout>
  );
}
