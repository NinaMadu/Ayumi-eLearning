import React, { useEffect, useRef } from 'react';
import Player from '@vimeo/player';
import {  useParams } from 'react-router-dom';



export default function VideoPreview() {
    
    const vimeoRef = useRef(null);
    const {videoId} = useParams()

    useEffect(()=>{


        if(vimeoRef.current  && videoId){
            const player = new Player(vimeoRef.current,{
                id: videoId,
                width: '100%',
            });

            player.on('play', ()=>{
                console.log('playing');
            });

            return ()=>{
                player.unload();
            };
        }
    },[videoId]);

  return (
    <div >
    
      <h1 style={{marginBottom: '20px', textAlign: 'center'}}>VideoPreview</h1>

     
      
    

     <iframe
        src={`https://player.vimeo.com/video/${videoId}`}
        style={{
            position: 'relative',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            border: 'none',
        }}
        allow='autoplay;fullscreen'
        title='VideoPreview'
      ></iframe>   
     

        
    


    </div>
  )
}
