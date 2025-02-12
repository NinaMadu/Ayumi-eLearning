import React, { useState } from 'react';
// import 'dotenv/config';
import { Link, Navigate, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import AdminLayout from '../../../components/AdminLayout.jsx';
import { useSelector } from 'react-redux';
import { Upload } from "tus-js-client";
import { storage } from '../../../firebase.js';
// import {app} from '../../firebase.js';
import { ref, uploadBytesResumable, getDownloadURL  } from 'firebase/storage';
import SuccessBox from '../../../components/SuccessBox.jsx';
// import { set } from 'mongoose';


const accessToken = import.meta.env.VITE_ACCESS_TOKEN;


const headerPost = {
    Accept: 'application/vnd.vimeo.*+json;version=3.4',
    Authorization: `bearer ${accessToken}`,
    'Content-Type': 'application/json'
};

export default function VideoUpload() {
    const location = useLocation();
    const { courseId } = location.state;
    const { currentUser } = useSelector((state) => state.user);
    const navigate = useNavigate();

    const [thumbnailFile, setThumbnailFile] = useState(null);
    const [videoFile, setVideoFile] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        thumbnailUrl: '',
        videoId: ''
    });
    // const [duration, setDuration] = useState(0);

    const [error, setError] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [thumbnailUploaded, setThumbnailUploaded] = useState(false);
    const [showSuccessBox, setShowSuccessBox] = useState(false);
    //backend url    
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


    const resetForm = ()=>{
        setThumbnailFile(null);
        setVideoFile(null);
        setFormData({
            title: '',
            description: '',
            thumbnailUrl: '',
            videoId: ''
        });
        setProgress(0);
        setThumbnailUploaded(false);
        setError(false);
        setUploading(false);
        setShowSuccessBox(false);
    };

    const handleCloseSuccessBox = () =>{
        resetForm();
        
       
    }
    
    const handleInputChange = (e) => {
        const { id, value, files } = e.target;
        if (id === 'thumbnail') {
            setThumbnailFile(files[0]);
        } else if (id === 'video') {
            setVideoFile(files[0]);
        } else {
            setFormData((prev)=>({
                ...prev,
                [id]: value,
            }));
        }
    };


    //this is for thumbnail.
    const handleUploadThumbnail = (file) => {
        // const storage = getStorage();
        console.log("File being uploaded: ", file);
        if(!file)
        {
            console.error("No file was provided for upload");
            return;
        }

        const fileName = `${new Date().getTime()}-${file.name}`; 
        // console.log("File name: ", fileName);
        const storageRef = ref(storage, `uploads/${fileName}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        return new Promise((resolve, reject) => {
            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(`Upload is ${progress}% done`);
                },
                (error)=>{
                    console.error("Upload failed", error);
                    reject(error);
                },
                
                () => {
                    getDownloadURL(uploadTask.snapshot.ref)
                    .then((url)=>{
                            console.log("Thumbnail URL: ", url);
                            setThumbnailUploaded(true);
                            resolve(url);
                    })
                    .catch((error)=>{
                        console.error("Failed to get download URL", error);
                        reject(error);
                    });
                }
            );
        });
    };



    //videoupload here
    const handleVideoUpload = async (vfile)=>{

    const file = vfile;
    const fileSize = file.size.toString();
    console.log("videoUpload function");

    try{

        const response = await axios(
            
            { 
    
                
                method: 'post',
                url:`https://api.vimeo.com/me/videos`,
                headers: headerPost,
                data:{
                    upload:{
                        approach:'tus',
                        size: fileSize,
                    }
               } 
            }             
               
                               
            
        );
    
        const videoUri = response.data.uri;
        const videoId = videoUri.split('/').pop();
    
        return new Promise((resolve, reject) => {

            const upload = new Upload(file,{
                endpoint:'https://api.vimeo.com/me/videos',
                uploadUrl:response.data.upload.upload_link,
        
                retryDelays: [0, 3000, 5000, 10000, 20000],
              metadata: {
                filename: file.originalname,
                filetype: file.mimetype
              },
              headers: {},
              onError: function(error) {
                console.log('Failed because: ' + error);
                reject(error);
              },
              onProgress: function(bytesUploaded, bytesTotal) {
                let percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
                console.log(bytesUploaded, bytesTotal, percentage + '%');
                setProgress(Number(percentage));
              },
              onSuccess: async function() {
                console.log('Download %s from %s', upload.file.name, upload.url);
                console.log('video Id success',videoId);
                // resolve(videoId);
                
                    console.log('videoId',videoId);
                    

                    

                    resolve(videoId);
                
                
              },
            });
        
            
           upload.start();
        
           console.log(videoId);    
         
            // setFormData({...formData, videoId});
        });
        


    } catch(error){
        console.log(error);
        throw error;
    }
   

        
    };
    
    const getDuration = async (videoId) => {
        try {
          const response = await axios.get(`https://api.vimeo.com/videos/${videoId}`, {
            headers: headerPost,
          });
          const duration = response.data.duration;
          console.log('Video duration:', duration);
          return duration;
        } catch (error) {
          console.error('Error fetching video duration:', error);
          return null;
        }
      };


    const handleSubmit = async () => {
        if (thumbnailFile && videoFile) {

            //here the error
            setUploading(true);
            try {
                const thumbnailUrl = await handleUploadThumbnail(thumbnailFile);
                console.log("Thumbnail URL:",thumbnailUrl);
                //video upload here
                const {videoId} = await handleVideoUpload(videoFile);
                

                // console.log("Video ID:",videoId);
                // console.log("Video Duration:",videoDuration);
                //const videoUrl = `https://vimeo.com/${videoId}`;


               

                setFormData({ ...formData, thumbnailUrl, videoId });

                const videoData = {
                    title: formData.title,
                    description: formData.description,
                    thumbnailUrl,
                    videoId
                };

                const videoDuration = await getDuration(videoId);
                console.log("Video Duration:",videoDuration);

                if (!videoId || !videoDuration) {
                    setError('Video upload failed: Invalid video data');
                    return;
                }

                await axios.post(`${API_BASE_URL}/api/videoUpload`, videoData,{
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                //const courseId = courseId; // Replace with the actual course ID from the course you're updating
                await axios.post(`${API_BASE_URL}/api/course/${courseId}/playlist`, { videoId, title:formData.title, videoDuration }
                    
                );


                setUploading(false);
                // navigate('/success-page'); 
                setShowSuccessBox(true);


            } catch (error) {
                console.error('Upload error:', error);
                setError('Failed to upload files brooo');
                setUploading(false);
            }
        } else {
            setError('Both thumbnail and video files are required');
        }
    };
    return (
        //<AdminLayout>
            <div className="container px-4 mx-auto">
                 {showSuccessBox && (
        <SuccessBox
          title="Upload Successful!"
          message="Your video has been uploaded successfully."
          onClose={handleCloseSuccessBox}
        />
      )}
                <div className="px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md">
                    <h1 className="mb-4 text-xl font-semibold">Upload Videos from Here</h1>
                    <form>
                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-semibold text-gray-700" htmlFor="title">
                                Title:
                            </label>
                            <input className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" 
                            id="title" 
                            type="text"
                            value={formData.title}
                            onChange={handleInputChange} />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-semibold text-gray-700" htmlFor="description">
                                Description:
                            </label>
                            <textarea className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" 
                            id="description"
                            onChange={handleInputChange} 
                            value={formData.description}
                            >

                            </textarea>
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-semibold text-gray-700" htmlFor="thumbnail">
                                Thumbnail:
                            </label>
                            <input className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" 
                            
                            id="thumbnail" 
                            type="file" 
                            onChange={handleInputChange}/>
                            {thumbnailUploaded && (
              <div className="flex items-center mt-2 text-green-600">
                <span>✔ Thumbnail Uploaded Successfully</span>
              </div>
            )}
                            <div className="flex items-center justify-start mt-2 space-x-2">
                               
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-semibold text-gray-700" htmlFor="video">
                                Upload video:
                            </label>
                            <input className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" 
                           
                            id="video" 
                            type="file" 
                            onChange={handleInputChange}/>
                            {uploading && (
              <div className="mt-4">
                <p className="text-sm text-gray-700">Uploading Video: {progress}%</p>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            )}
                        </div>
                        
                        <div className="flex items-center justify-between">
                            <button 
                            type="button" 
                            className="flex justify-center w-full p-2 mt-8 font-semibold text-white bg-blue-900 border rounded-lg border-slate-200 hover:opacity-85"
                            onClick={handleSubmit}
                            disabled = {uploading}
                            >
                                {uploading ? 'Uploading...' : 'Publish Video'}
                            </button>
                           
                        </div>
                    </form>
                    {error && <p className="text-red-500">{error}</p>}</div>
                    {showSuccessBox && (
                <SuccessBox
                  title="Upload Successful!"
                  message="Your video has been uploaded successfully."
                  onClose={() => setShowSuccessBox(false)} // Close the success box
                />
              )}
            </div>
            
            
        //</AdminLayout>
    );
}
