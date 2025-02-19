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
    // setUpVimeoPlayer();

    return () => {
      if(vimeoPlayerRef.current)
      {
        vimeoPlayerRef.current.destroy();

      }
      
    };
  }, [videoId]);

  // useEffect(()=>{
  //   if(watchedTime !== undefined)
  //   {
  //     setUpVimeoPlayer();
  //   }
  // },[watchedTime]);

  const fetchVideoData = async () => {
    try {


      const[ videoResponse, progressResponse ] = await Promise.all([
        axios.get(`${API_BASE_URL}/api/video/${videoId}`),
        axios.get(`${API_BASE_URL}/api/users/userProgress/${userId}/${courseId}/${videoId}`)
      ]);

      setTitle(videoResponse.data.video.title);
      setDescription(videoResponse.data.video.description);
      setWatchedTime(progressResponse.data.watchedTime || 0 );
      setUpVimeoPlayer(progressResponse.data.watchedTime || 0 );


      // const response = await axios.get(`${API_BASE_URL}/api/video/${videoId}`);
      // setTitle(response.data.video.title);
      // setDescription(response.data.video.description);
    


      // const progressResponse = await axios.get(`${API_BASE_URL}/api/users/userProgress/${userId}/${courseId}/${videoId}`);
      // setWatchedTime(progressResponse.data.watchedTime || 0 );
      // console.log(progressResponse.data.watchedTime);
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

  const setUpVimeoPlayer = (initialTime) =>{
    if(!playerRef.current || vimeoPlayerRef.current) return;
  

  const player = new Player(playerRef.current, {
    id: videoId,
    responsive: true,
    // width: '100%',
    // height: '100%',
    autoplay: false,
  });

  vimeoPlayerRef.current = player;


  player.ready().then(async()=>{

    console.log('Player is ready');
    console.log(initialTime);

    // setIsPlaying(true);

    if(initialTime>0)
    {
      try{
        await player.setCurrentTime(initialTime);
        console.log('set current time',initialTime);
      }
      catch(error){
        console.error('Error setting current time:', error);

      }      
    }
  });




  //listen

  player.on('play', () => {
    console.log('video is playing');
    // setIsPlaying(true);
  });

  player.on('pause', async() => {
    console.log('video is paused');
    // setIsPlaying(false);
    // const currentTime = await player.getCurrentTime();
    // const duration = await player.getDuration();

    const [currentTime, duration] = await Promise.all([
      player.getCurrentTime(),
      player.getDuration()
    ]);

    if(Math.floor(currentTime) === Math.floor(duration))
    {
        console.log('Paused at the end, Skipping updateWatched time');
        return;
    }

    // setIsPlaying(false);
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
    // setIsPlaying(false);
    const currentTime = await player.getCurrentTime();
    updateWatchedTime(Math.floor(currentTime));
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
    <div className="max-w-4xl p-5 mx-auto rounded-lg shadow-md bg-gray-50">
      <h1 className="mb-6 text-3xl font-bold text-center text-gray-800">
        {title}
      </h1>

      {/* Responsive Video Player Container */}
      <div className="relative w-full h-0 pb-[56.25%] rounded-lg overflow-hidden shadow-lg mb-6">
        <div
          ref={playerRef}
          className="absolute top-0 left-0 w-full h-full "
        />
      </div>

      <div className="p-5 bg-white rounded-lg shadow">
        <h2 className="mb-3 text-xl font-bold text-gray-700">
          Description
        </h2>
        <p className="text-gray-600 whitespace-pre-wrap">
          {description}
        </p>
      </div>
    </div>
  </UserLayout>
  );
}
