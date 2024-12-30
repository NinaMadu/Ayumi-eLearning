
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

//
import ConfirmationBox from '../../../components/ConfirmationBox';
import SuccessBox from '../../../components/SuccessBox';
import AdminLayout from '../../../components/AdminLayout';


export default function VideoPreview() {

    const { videoId } = useParams();
    const vimeoRef = useRef(null);
    const [title, setTitle] = useState(null);
    const [description, setDescription] = useState(null);
    const [thumbnailUrl, setThumbnailUrl] = useState(null);
    // const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    //
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const navigate = useNavigate();
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
   
    

    useEffect(()=>{

      // console.log(videoId);
      getVideoData();

    },[videoId]);

    const getVideoData = async () =>{
      try{
        const response = await axios.get(`${API_BASE_URL}/api/video/${videoId}`);
        // console.log(videoId);
        // console.log(response.data.video);
        setTitle(response.data.video.title);
        setDescription(response.data.video.description);
        setThumbnailUrl(response.data.video.thumbnailUrl);
      }
      catch(error){
        console.error('Error fetching video data:', error);

      }
    };

    const handleDelete =  (videoId)=>{
        setShowConfirmation(true);      
    };

    const handleUpdate = ()=>{
      navigate(`/instructor/videoUpdate/${videoId}`);
    }

    const confirmDelete = async () =>{
      try{
        const response = await axios.delete(`${API_BASE_URL}/api/videoDelete/${videoId}`,{
          data : {
            thumbnailUrl,
          }
        });
        console.log(response.data);
        
        //
        setShowConfirmation(false);
        setShowSuccess(true);

      }
      catch(error){
        console.error('Error deleting video:', error);
      }
    };      
      
    const cancelDelete = () => {
        setShowConfirmation(false);
    };

    const closeSuccessBox = ()=>{
        setShowSuccess(false);
    }


  


    
  return (
    <AdminLayout>
    <div
    style={{
      padding:'20px',
      fontFamily:'Inter, sans-serif',
    }}>

      {/* <h1 
      style={{
          marginBottom:'24px',
          textAlign:'center',
          fontSize:'32px',
          fontWeight:'600',
          color:'#333',
      }}>The Video Player

      </h1> */}

      <div>
        <div 
        style={{
          display:'flex',
          flexDirection:'column',
          alignItems:'center',
          padding:'24px',
          backgroundColor:'#f9f9f9',
          borderRadius:'12px',
          boxRadius:'0 8px 16px rgpa(0,0,0,0.2)',
          maxWidth:'800px',
          margin:'0 auto',
        }}>

          <iframe
          ref={vimeoRef}
          style={{
            width:'100%',
            height:'400px',
            border:'none',
            borderRadius:'10px',
            overflow:'hidden',
            boxShadow:'0 0 10px rgba(0,0,0,0.3)',
            backgroundColor:'black',
            objectFit:'cover',
          }}
          src={`https://player.vimeo.com/video/${videoId}?badge=0&byline=0&title=0&portrait=0`}
          allow='autoplay; fullscreen; picture-in-picture'
          allowFullScreen
          >

          </iframe>

          <div
          style={{
            display:'flex',
            justifyContent:'space-between',
            alignItems:'center',
            width:'100%',
            padding:'16px 0',
            color:'#555',
          }}>
            {/* <p
            style={{
              fontSize:'20px',
            }}>
              <span>By</span> Dr.Kushan
            </p>           */}

          </div>
          <div 
          style={{
            display:'flex',
            justifyContent:'space-evenly',
            alignItems:'center',
            width:'100%',
            padding:'16px 0',
            color:'#555',

          }}>
            
            <button
            style={{
              padding:'10px 20px',
              fontSize:'16px',
              fontWeight:'bold',
              borderRadius:'8px',
              cursor:'pointer',
              marginRight:'10px',
              backgroundColor:'#4CAF50',
              color:'white',
              border:'none',
              transition:'background-color 0.3s ease',
            }}
            onMouseEnter={
              (e)=> e.target.style.backgroundColor = '#45a049'
            }
            onMouseLeave={
              (e)=> e.target.style.backgroundColor = '#4CAF50'
              }
            onClick={handleUpdate}  >Update</button>

              { showConfirmation &&
              (
              <ConfirmationBox
                title="Confirm Delete"
                message="Are you sure you want to delete this video?"
                onConfirm={confirmDelete}
                onCancel={cancelDelete}
              />
            )}


            <button style={{
                    padding: '10px 20px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    backgroundColor: '#FF5733', 
                    color: 'white',
                    border: 'none',
                    transition: 'background-color 0.3s ease'
                  }} 
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#e94e2c'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#FF5733'}
                  onClick={() => handleDelete(videoId)}
                  >
                    Delete
                  </button>
          </div>


        </div>
        <div
        style={{
          display:'flex',
          flexDirection:'column',
          alignItems:'start',
          padding:'24px',
          backgroundColor:'#f9f9f9',
          borderRadius:'12px',
          boxRadius:'0 8px 16px rgpa(0,0,0,0.2)',
          maxWidth:'800px',
          margin:'0 auto',
          marginTop:'24px',
        }}>
        <h3
      style={{
        fontSize: '28px',
        margin: '20px 0 10px',
        borderTop: '1px solid #e0e0e0',
        paddingTop: '16px',
        color:'#333',
      }}
      > {title}</h3>
          <p
          style={{
            fontSize: '18px',
            letterSpacing: '0.5px',
            lineHeight: '1.6',
            color:'#666',
            textAlign: 'justify',
            marginBottom: '24px',

          }}>
             {description}
          </p>
          </div>

          {showSuccess &&(
            <SuccessBox
              title = "Success"
              message= "Video updated successfully"
              onClose={closeSuccessBox}

              />
          )}





      </div>


    </div>
    </AdminLayout>
  )
}
