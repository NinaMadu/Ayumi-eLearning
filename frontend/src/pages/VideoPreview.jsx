import React, { useEffect, useRef } from 'react';
import Player from '@vimeo/player';
import {  useParams } from 'react-router-dom';
import { IoHeart } from "react-icons/io5";
import { IoChatbox } from "react-icons/io5";
import { IoBookmark } from "react-icons/io5";


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
    
      <h1 style={{
        marginBottom: '20px', 
        textAlign: 'center',
        fontSize: '30px',
        fontFamily: 'Inter',
        }}>The Video Player</h1>

     
      
    
      <div
      style={{
        width: '100%',
        paddingRight:'16px',
        borderRight: '1px solid #ccc',
      }}>
       
      <iframe
      style={{
        width:'50%',
        height:'400px',
        display: 'block',
        margin: '0 auto',
        border: 'none',
        borderRadius: '10px',
        overflow: 'hidden',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
        backgroundColor: 'white',
        position: 'relative',
        zIndex: '1',

      }}        
        src={`https://player.vimeo.com/video/${videoId}`}
        frameborder="0"
        webkitallowfullscreen mozallowfullscreen allowfullscreen
      ></iframe>
      
      <div 
      style={{
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
      }}>

        
        <p
        style={{
          fontSize:'24px', 
          color:'rgba(0,0,0,0.7)',
          margin: '0',
          marginTop: '16px',
          marginLeft: '50px',
        }}><span
        >98.4k</span> views</p>
        <div
        style={{
          display: 'flex',
          
        }}>
       
          <IoHeart className='fa fa-heart' 
          style={{
            fontSize: '24px',
            color: 'rgba(0,0,0,0.7)',
            marginRight: '20px',
            marginTop: '16px',
            cursor: 'pointer',
          }}></IoHeart>
          <IoChatbox className='fa fa-comment-alt'
           style={{
            fontSize: '24px',
            color: 'rgba(0,0,0,0.7)',
            marginRight: '20px',
            marginTop: '16px',
            cursor: 'pointer',
          }}></IoChatbox>
          <IoBookmark
           style={{
            fontSize: '24px',
            color: 'rgba(0,0,0,0.7)',
            marginRight: '20px',
            marginTop: '16px',
            cursor: 'pointer',
          }}></IoBookmark>
         

</div>
        
      </div>
      <h3
      style={{
        fontSize: '36px',
        marginTop: '16px',
        marginBottom: '16px',
        borderTop: '1px solid #ccc',
        paddingTop: '16px',
      }}
      >Croissants  | Flour and Stone</h3>
          <p
          style={{
            fontSize: '20px',
            letterSpacing: '1px',
            lineHeight: '1.3',
            marginTop: '0',
            color:'rgba(0,0,0,0.7)',
            marginBottom: '100px',

          }}>
            There is no other way but to commit
         wholeheartedly to a relationship with a croissant. 
         We have all found ourselves at the mercy of its allure.
          Here, in another epic film by the uber talented Nathan Rodger, 
          our Erin divulges her personal romance with The Croissant.
          </p>



      </div>
      </div> 
     
     

        
    


   
  )
}
