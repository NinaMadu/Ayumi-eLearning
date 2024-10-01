import React, { useState } from 'react';
// import 'dotenv/config';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminLayout from '../../components/AdminLayout';
import { useSelector } from 'react-redux';
import { Upload } from "tus-js-client";
import { storage } from '../../firebase.js';
// import {app} from '../../firebase.js';
import { ref, uploadBytesResumable, getDownloadURL  } from '@firebase/storage';

const accessToken = import.meta.env.VITE_ACCESS_TOKEN;


const headerPost = {
    Accept: 'application/vnd.vimeo.*+json;version=3.4',
    Authorization: `bearer ${accessToken}`,
    'Content-Type': 'application/json'
};

export default function VideoUpload() {
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

    const [error, setError] = useState(false);
    const [uploading, setUploading] = useState(false);

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
        console.log("File being uploaded:", file);
        if(!file)
        {
            console.error("No file was provided for upload");
            return;
        }

        const fileName = `${new Date().getTime()}-${file.name}`; 
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
                    .then(resolve)
                    .catch(reject);
                }
            );
        });
    };



    //videoupload here
    const handleVideoUpload = async (vfile,title)=>{

    const file = vfile;
    const fileSize = file.size.toString();

    try{

        const response = await axios.post(
            'https://api.vimeo.com/me/videos',
            { 
    
                
                
               
                    upload:{
                        approach:'tus',
                        size: fileSize,
                    },
                    name:title,},
                    {
                        headers:headerPost,
                    }               
            
        );
    
        const videoUri = response.data.uri;
        const videoId = videoUri.split('/').pop();
    
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
          },
          onProgress: function(bytesUploaded, bytesTotal) {
            let percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
            console.log(bytesUploaded, bytesTotal, percentage + '%');
          },
          onSuccess: function() {
            console.log('Download %s from %s', upload.file.name, upload.url);
            
          }
        });
    
        
       upload.start();
    
       console.log(videoId);    
       return videoId;

    } catch(error){
        console.log(error);
        throw error;
    }
   

        
    }



    const handleSubmit = async () => {
        if (thumbnailFile && videoFile) {

            //here the error
            setUploading(true);
            try {
                const thumbnailUrl = await handleUploadThumbnail(thumbnailFile);
                console.log("Thumbnail URL:",thumbnailUrl);
                //video upload here
                const videoId = await handleVideoUpload(videoFile,formData.title);
                console.log("Video ID:",videoId);
                //const videoUrl = `https://vimeo.com/${videoId}`;
                setFormData({ ...formData, thumbnailUrl, videoId });

                const videoData = {
                    title: formData.title,
                    description: formData.description,
                    thumbnailUrl,
                    videoId
                };

                await axios.post('/api/videoUpload', videoData,{
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                setUploading(false);
                navigate('/success-page'); 


            } catch (error) {
                console.error('Upload error:', error);
                setError('Failed to upload files');
                setUploading(false);
            }
        } else {
            setError('Both thumbnail and video files are required');
        }
    };
    return (
        //<AdminLayout>
            <div className="container px-4 mx-auto">
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
                            onChange={handleInputChange} />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-semibold text-gray-700" htmlFor="description">
                                Description:
                            </label>
                            <textarea className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" 
                            id="description"
                            onChange={handleInputChange} ></textarea>
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-semibold text-gray-700" htmlFor="thumbnail">
                                Thumbnail:
                            </label>
                            <input className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" 
                            id="thumbnail" 
                            type="file" 
                            onChange={handleInputChange}/>
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
                    {error && <p className="text-red-500">{error}</p>}
                </div>
            </div>
        //</AdminLayout>
    );
}
