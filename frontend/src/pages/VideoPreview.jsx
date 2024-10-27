import React, { useEffect, useRef } from 'react';
import {  useParams } from 'react-router-dom';
import { IoHeart } from "react-icons/io5";
import { IoChatbox } from "react-icons/io5";
import { IoBookmark } from "react-icons/io5";



export default function VideoPreview() {
    
    const vimeoRef = useRef(null);
    const {videoId} = useParams()

    useEffect(()=>{

    },[videoId]);

  return (
    <div 
    style={{
      padding:'20px',
      //
      fontFamily: 'Inter, sans-serif',
    }}>
    
      <h1 style={{
        marginBottom: '24px', 
        textAlign: 'center',
        fontSize: '32px',
        // fontFamily: 'Inter',
        //
        fontWeight: '600',
        color:'#333',
        }}>The Video Player</h1>

     
      
      <div>
    
      <div
      style={{
       
        display: 'flex',
        flexDirection: 'column',
        alignItems:'center',
        padding:'24px',
        backgroundColor: '#f9f9f9',
        borderRadius: '12px',
        boxShadow: '0 8px 16px rgpa(0,0,0, 0.2)',
        maxWidth:'800px',
        // justifyContent: 'center',
        margin:'0 auto',   

        

      }}
      
      >
       
    
      

       
        <iframe
      style={{
        width:'100%',
        height:'400px',
        maxWidth:'800px',
        // display: 'block',
        // margin: '0 auto',
        border: 'none',
        borderRadius: '10px',
        overflow: 'hidden',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
        backgroundColor: 'black',
        // position: 'relative',
        // zIndex: '1',
        objectFit: 'cover',

      }}        
        src={`https://player.vimeo.com/video/${videoId}?badge=0&byline=0&title=0&portrait=0`}
        
        
       
        allow='autoplay; fullscreen; picture-in-picture'
        allowfullscreen
      >
        
      </iframe>
      
      <div style={{
        
        display: 'flex',
        // flexDirection: 'row',       
        justifyContent: 'space-between',
        alignItems: 'center',
        width:'100%',
        padding:`16px 0`,
        color:'#555',
      }}>

        
      <p
        style={{
          fontSize:'20px', 
          
        
        }}><span
        >By</span> Dr.Kushan
        
        </p>
        <IoHeart className='fa fa-heart' 
          style={{
            fontSize: '24px',
            color: '#ff6464',
           
            // marginTop: '16px',
            cursor: 'pointer',
          }}></IoHeart>

        </div>
        
        
        
        </div>
     
     
      <h3
      style={{
        fontSize: '28px',
        margin: '20px 0 10px',
        // marginBottom: '16px',
        borderTop: '1px solid #e0e0e0',
        paddingTop: '16px',
        color:'#333',
      }}
      >Croissants  | Flour and Stone</h3>
          <p
          style={{
            fontSize: '18px',
            letterSpacing: '0.5px',
            lineHeight: '1.6',
            color:'#666',
            // marginTop: '0',
            textAlign: 'justify',
            marginBottom: '24px',

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
