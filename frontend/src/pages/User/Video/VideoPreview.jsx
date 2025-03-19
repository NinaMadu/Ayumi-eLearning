import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import UserLayout from '../../../components/UserLayout';
import { useSelector } from 'react-redux';
// import { set } from 'mongoose';
import Player from '@vimeo/player';
// import { Collection } from 'mongoose';


export default function UserVideoPreview() {

  ///user/course/:courseId/video/:videoId
  const { courseId,videoId } = useParams();
  const currentUser = useSelector((state) => state.user.currentUser);

  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [watchedTime, setWatchedTime] = useState(0);
  // const [isPlaying, setIsPlaying] = useState(false);
  const [videoRatio, setVideoRatio] = useState('16/9');
  const [isPortrait, setIsPortrait] = useState(false);
  const [playerHeight, setPlayerHeight] = useState('56.25%');


  const userId = currentUser._id;


  // const intervalRef = useRef(null);
  const playerRef = useRef(null);
  const vimeoPlayerRef = useRef(null);
  const intervalRef = useRef(null);
  const containerRef = useRef(null); 










  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    fetchVideoData();
    // setUpVimeoPlayer();
    

    return () => {

      if(intervalRef.current)
      {
        clearInterval(intervalRef.current);

      }
     
      

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
    controls: true,
    title: false,
    byline: false,
    portrait: false,
    speed:true,
    playsinline: true,
    dnt: true,
    quality:'auto',

    embed:{
      buttons:{
        share: false,
        embed: false,
        like: false,
        watchLater:false,
        collection:false
      },
      logos:{
        vimeo:false,
        custom:{
          active:false
        }
      },
      title:false,
      speed:true,
      transparent: false,
      playbar:true,
      volume:true,
      fullscreen:true
    }



  });

  vimeoPlayerRef.current = player;


  player.ready().then(async()=>{

    console.log('Player is ready');
    console.log(initialTime);


    try{
      const videoData = await player.getVideoHeight();
      const videoWidth = await player.getVideoWidth();
      const aspectRatio =  videoWidth / videoData;
      setVideoRatio(aspectRatio);

      if (aspectRatio < 1)
      {

        setIsPortrait(true);
        setPlayerHeight(`${100 / aspectRatio}%`);
      } else {
        setIsPortrait(false);

      }

      if(initialTime>0)
        {
          
            await player.setCurrentTime(initialTime);
            console.log('set current time',initialTime);
        }




    }


    // setIsPlaying(true);

   
      
      catch(error){
        console.error('Error setting current time:', error);

      }      
    }
  );




  //listen

  player.on('play', () => {
    console.log('video is playing');
    startInterval();
    // setIsPlaying(true);
  });

  player.on('pause', async() => {
    console.log('video is paused');
    stopInterval();
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
    stopInterval();

    // setIsPlaying(false);
    const currentTime = await player.getCurrentTime();
    updateWatchedTime(Math.floor(currentTime));
  });

  

};

const startInterval = () => {
  if (intervalRef.current) clearInterval(intervalRef.current);

  intervalRef.current = setInterval(async () => {
    if (vimeoPlayerRef.current) {
      const currentTime = Math.floor(await vimeoPlayerRef.current.getCurrentTime());
      updateWatchedTime(currentTime);
    }
  }, 10000); // Every 10 seconds
};

const stopInterval = () => {
  if (intervalRef.current) {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  }
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
      <div 
          ref={containerRef}
          className={`relative w-full mx-auto overflow-hidden shadow-lg mb-6 rounded-lg ${isPortrait ? 'max-w-md' : 'max-w-full'}`}
          style={{ 
            paddingBottom: isPortrait ? '0' : '56.25%', // Only use aspect ratio padding for landscape
            height: isPortrait ? playerHeight : 'auto'  // Set fixed height for portrait
          }}
        >
          <div
            ref={playerRef}
            className={`${isPortrait ? 'h-full' : 'absolute top-0 left-0 w-full h-full'}`}
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
