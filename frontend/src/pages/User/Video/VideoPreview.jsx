import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import UserLayout from '../../../components/UserLayout';
import { useSelector } from 'react-redux';
// import { set } from 'mongoose';
import Player from '@vimeo/player';


export default function UserVideoPreview() {

  ///user/course/:courseId/video/:videoId
  const { courseId,videoId } = useParams();
  const currentUser = useSelector((state) => state.user.currentUser);

  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [watchedTime, setWatchedTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const userId = currentUser._id;


  // const intervalRef = useRef(null);
  const playerRef = useRef(null);
  const vimeoPlayerRef = useRef(null);











  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    fetchVideoData();
    setUpVimeoPlayer();

    return () => {
      if(vimeoPlayerRef.current)
      {
        vimeoPlayerRef.current.destroy();

      }
      
    }
  }, [videoId]);

  const fetchVideoData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/video/${videoId}`);
      setTitle(response.data.video.title);
      setDescription(response.data.video.description);
    


      const progressResponse = await axios.get(`${API_BASE_URL}/api/users/userProgress/${userId}/${courseId}/${videoId}`);
      setWatchedTime(progressResponse.data.watchedTime || 0 );
      // console.log(currentUser);
    
    
    } catch (error) {
      // console.log(userId);
      // console.log(currentUser);
      console.error('Error fetching video data:', error);
      setTitle('Video Not Found');
      setDescription(
        'The requested video is unavailable. Please contact support if the problem persists.'
      );
    }
  };

  const setUpVimeoPlayer = () =>{
    if(!playerRef.current) return;
  

  const player = new Player(playerRef.current, {
    id: videoId,
    autoplay: true,
  });

  vimeoPlayerRef.current = player;


  //listen

  player.on('play', () => {
    console.log('video is playing');
    setIsPlaying(true);
  });

  player.on('pause', async() => {
    console.log('video is paused');
    setIsPlaying(false);
    const currentTime = await player.getCurrentTime();
    const duration = await player.getDuration();

    if(Math.floor(currentTime) === Math.floor(duration))
    {
        console.log('Paused at the end, Skipping updateWatched time');
        return;
    }

    setIsPlaying(false);
    updateWatchedTime(Math.floor(currentTime));
    
  });

  player.on('timeupdate', (data) => {
    setWatchedTime(Math.floor(data.seconds));
  });

  player.on('seeked',(data)=>{
    console.log('seeked to ',data.seconds);
    setWatchedTime(Math.floor(data.seconds));
  });

  player.on('ended', async () => {
    console.log('video is ended');
    setIsPlaying(false);
    const currentTime = await player.getCurrentTime();
    updateWatchedTime(Math.floor(currentTime));
  });

  player.ready().then(()=>{
    if(watchedTime>0)
    {
      player.setCurrentTime(watchedTime).catch((error)=>{
          console.error('Error setting current time:', error);
      });
    }
  });

};


  const updateWatchedTime=async(time)=>{
    try{

      await axios.post(`${API_BASE_URL}/api/users/userProgressUpdate`,{
        videoId,
        userId,
        courseId,
        watchedTime:time,
      });

      console.log('watched time updated',time);

    }
    catch(error){
      console.error('Error updating watched time:', error);

    }

  } 


  

  

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
        <div
            ref={playerRef}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
            }}
          ></div>

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
