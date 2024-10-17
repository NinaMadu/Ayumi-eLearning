import React, { useEffect, useRef } from 'react';
// import Player from '@vimeo/player';
import {  useParams } from 'react-router-dom';
import { IoHeart } from "react-icons/io5";
import { IoChatbox } from "react-icons/io5";
import { IoBookmark } from "react-icons/io5";
import ReactPlayer from 'react-player';


export default function VideoPreview() {
    
    const vimeoRef = useRef(null);
    const {videoId} = useParams()

    useEffect(()=>{


        // if(vimeoRef.current  && videoId){
        //     const player = new Player(vimeoRef.current,{
        //         id: videoId,
        //         width: '100%',
        //     });

        //     player.on('play', ()=>{
        //         console.log('playing');
        //     });

        //     return ()=>{
        //         player.unload();
        //     };
        // }
    },[videoId]);

  return (
    <div 
    style={{
      padding:'16px',
    }}>
    
      <h1 style={{
        marginBottom: '20px', 
        textAlign: 'center',
        fontSize: '30px',
        fontFamily: 'Inter',
        }}>The Video Player</h1>

     
      
      <div>
    
      <div
      style={{
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems:'center',

      }}
      // style={{
      //   width: '100%',
      //   paddingRight:'16px',
      //   borderRight: '1px solid #ccc',
      // }}
      >
       
    
      

        {/* <div style={{
          display: 'flex',
          justifyContent:'center',
          alignItems: 'center',
          backgroundColor: 'black',
          width: '50%',
          
          
        }}>  */}
        {/* <ReactPlayer 
        url={`https://player.vimeo.com/video/${videoId}` } 
        controls={true}
        config={{
          vimeo: {
            playerOptions:{
              title:0,
              byline:0,
              portrait:0,
              badge:0,
              loop:false,
              
              
            }
        }}}
        /> */}
        <iframe
      style={{
        width:'50%',
        height:'400px',
        display: 'block',
        margin: '0 auto',
        border: 'none',
        borderRadius: '10px',
        // overflow: 'hidden',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
        backgroundColor: 'black',
        position: 'relative',
        zIndex: '1',

      }}        
        src={`https://player.vimeo.com/video/${videoId}?badge=0&byline=0&title=0&portrait=0`}
        
        
        frameborder="0"
        allow='autoplay; fullscreen; picture-in-picture'
        allowfullscreen
      >
        
      </iframe>
      
      <div style={{
        padding:`16px`,
        display: 'flex',
        flexDirection: 'row',       
        justifyContent: 'space-between',
        alignItems: 'center',
        width:'50%',
      }}>

        
      <p
        style={{
          fontSize:'24px', 
          color:'rgba(0,0,0,0.7)',
        
        }}><span
        >By</span> Dr.Kushan
        
        </p>
        <IoHeart className='fa fa-heart' 
          style={{
            fontSize: '24px',
            color: 'rgba(0,0,0,0.7)',
           
            // marginTop: '16px',
            cursor: 'pointer',
          }}></IoHeart>

        </div>
        {/* </div> */}
        
        
        </div>
     
      {/* <div 
      style={{
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
      }}> */}

        
        
        {/* <div
        style={{
          display: 'flex',
          
        }}>
       
          <div></div><IoHeart className='fa fa-heart' 
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
          */}

{/* </div> */}
        
      {/* </div> */}
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
