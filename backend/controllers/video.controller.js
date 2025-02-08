
import Video from "../models/video.model.js";
import { storage } from "../firebase/firebase.js";
// import multer from "multer";
import { Upload } from "tus-js-client";
import { Readable } from "stream";

import { ref, uploadBytesResumable, getDownloadURL  } from 'firebase/storage';
import axios from 'axios'; 
// import {  ref , deleteObject } from 'firebase/storage';
import dotenv from 'dotenv';
// import multer from 'multer';
import Course from "../models/course.model.js";


dotenv.config();
// const upload = multer({ dest: 'uploads/' }); 

const accessToken = process.env.VITE_ACCESS_TOKEN;

// const upload = multer();

const headerPost = {
    Accept: 'application/vnd.vimeo.*+json;version=3.4',
    Authorization: `bearer ${accessToken}`,
    'Content-Type': 'application/json'
};

export const uploadVideo = async (req, res) => {
  try {
      const { title, description, courseId } = req.body;
      const thumbnailFile = req.files['thumbnail'][0];
      const videoFile = req.files['video'][0];

      if (!videoFile) {
          return res.status(400).json({ message: "No video file provided" });
      }

     // Step 1: Upload thumbnail to Firebase Storage
     const thumbnailUrl = await handleUploadThumbnail(thumbnailFile);

     // Step 2: Upload video to Vimeo
     const videoId = await handleVideoUpload(videoFile);


     const video = new Video({
      title,
      description,
      thumbnailUrl,
      videoId,
      courseId,
  });
  await video.save();

  // console.log(video);

  await Course.findByIdAndUpdate(courseId, { $push: { playlist: videoId } });




  res.status(200).json({ message: 'Video uploaded successfully', video });
} catch (error) {
  console.error('Error uploading video:', error);
  res.status(500).json({ message: 'Server error during video upload', error });
}
};


      
     

async function handleUploadThumbnail(file) {
  // const storage = getStorage();
  console.log("File being uploaded: ", file);
  if(!file)
  {
      console.error("No file was provided for upload");
      return;
  }

  const fileName = `${Date.now()}-${file.originalname}`;; 
  // console.log("File name: ", fileName);
  const storageRef = ref(storage, `uploads/${fileName}`);
  const uploadTask = uploadBytesResumable(storageRef, file.buffer);

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
                      // setThumbnailUploaded(true);
                      // coso
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

async function handleVideoUpload(file) {
  // const file = file;
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

            const upload = new Upload(Readable.from(file.buffer),{
                endpoint:'https://api.vimeo.com/me/videos',
                uploadUrl:response.data.upload.upload_link,
        
                retryDelays: [0, 3000, 5000, 10000, 20000],
                chunkSize: getChunkSize(file.size),
              metadata: {
                filename: file.originalname,
                filetype: file.mimetype
              },

              headers: {},
              onError: function(error) {
                console.log('Failed because: ' + error);
              },

              uploadSize: file.size,
              onProgress: function(bytesUploaded, bytesTotal) {
                let percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
                console.log(bytesUploaded, bytesTotal, percentage + '%');
                // setPr?ogress(Number(percentage));
                console.log(Number(percentage));
              },
              onSuccess: function() {
                console.log('Download %s from %s', upload.file.name, upload.url);
                resolve(videoId);
                
              },
            });
        
            
           upload.start();
        
           console.log(videoId);    
         
            // setFormData({...formData, videoId});
        })
        


    } catch(error){
        console.log(error);
        throw error;
    }
   

        
    }





    function getChunkSize(fileSize) {
      if (fileSize < 100 * 1024 * 1024) { // If file is less than 100MB
          return 5242880; // 5MB
      } else if (fileSize < 500 * 1024 * 1024) { // If file is less than 500MB
          return 16777216; // 16MB
      } else if (fileSize < 2 * 1024 * 1024 * 1024) { // If file is less than 2GB
          return 33554432; // 32MB
      } else {
          return 67108864; // 64MB for large videos
      }
  }






export const deleteCurrentThumbnail = async (req,res)=>{
    
    const thumbnailUrl = req.body.thumbnailUrl;
    
    if(thumbnailUrl){
        const filePath = decodeURIComponent(thumbnailUrl.split('/o/')[1].split('?')[0]);       
        
        
        try{
            await storage.file(filePath).delete();
            console.log('Thumbnail deleted successfully');
            
        }
        catch(error){
            console.error('Error deleting thumbnail:', error);

        }
    }
    else{
        console.log('Thumbnail URL not found');
    }
     
}





export const deleteVideo = async (req,res)=>{
   try{

     const videoId = req.params.id;
     const thumbnailUrl = req.body.thumbnailUrl;

     

     //1. vimeo delete
     try{
        await axios.delete(`https://api.vimeo.com/videos/${videoId}`,{
            headers: headerPost,
         }) 
         console.log('Video deleted successfully');


     }
     catch(error){
        console.error('Error deleting video:', error);
        return res.status(500).json({message:'Video Deletion error is there'});
     }
     
    

     

    //  2. thumbnail delete from firbase
    if(thumbnailUrl){
        const filePath = decodeURIComponent(thumbnailUrl.split('/o/')[1].split('?')[0]);       
        
        
        try{
            await storage.file(filePath).delete();
            console.log('Thumbnail deleted successfully');
        }
        catch(error){
            console.error('Error deleting thumbnail:', error);

        }
    }
    else{
        console.log('Thumbnail URL not found');
    }
     

     
     //mongodb delete
     //1. find 
     //2.delete
     try{
        const deletedVideo = await Video.findOneAndDelete({videoId});
     if(!deletedVideo)  
     {
        return res.status(404).json({message:'Video model not found'});
     }
     return res.status(200).json({
        message: 'Video model deleted successfully',
        video: deletedVideo
    });

     }
     catch(error)
     {
        console.error('Error deleting video model:', error);
        res.status(500).json({message:'mongodb error'});
     }
     
        
 
   }
    

   catch(error)
   {
    console.error('Error deleting video:', error);
    res.status(500).json({message:'Server error'});
   }


  

   


};

export const getVideos = async (req,res)=>{
    try{
        const videos = await Video.find();
        return res.status(200).json({
            message: 'Videos fetched successfully',
            videos
        })
    }
    catch(error){
        console.error('Error fetching videos:', error);
        res.status(500).json({message:'Server error'});
    }
}     


export const getVideoById = async (req,res)=>{
    try{
        const videoId = req.params.id;
        const video = await Video.findOne({videoId});
        return res.status(200).json({
            message: 'Video fetched successfully',
            video
        })

    }
    catch(error){

        console.error('Error fetching video:', error);
        res.status(500).json({message:'Server error'});
    }
}


export const updateVideo = async (req, res) => {
    try {
      const videoId = req.params.id; // Vimeo video ID
      const { title, description, newThumbnailUrl, oldThumbnailUrl } = req.body;
  
    //   // Check if newThumbnailUrl and oldThumbnailUrl are both provided
    //   if (newThumbnailUrl && !oldThumbnailUrl) {
    //     return res.status(400).json({ message: "Old thumbnail URL must be provided when updating the thumbnail." });
    //   }
  
      // 1. Replace thumbnail in Firebase (if a new one is provided)
      if (newThumbnailUrl && oldThumbnailUrl) {
        // Delete the old thumbnail
        try {
          const oldFilePath = decodeURIComponent(
            oldThumbnailUrl.split("/o/")[1].split("?")[0]
          );
          await storage.file(oldFilePath).delete();
          console.log("Old thumbnail deleted successfully");
        } catch (error) {
          console.error("Error deleting old thumbnail:", error);
          return res.status(500).json({ message: "Failed to delete old thumbnail from Firebase." });
        }
      }
  
      // 2. Update video record in MongoDB
      try {
        const updatedVideo = await Video.findOneAndUpdate(
          { videoId },
          {
            ...(title && { title }),
            ...(description && { description }),
            ...(newThumbnailUrl && { thumbnailUrl: newThumbnailUrl }),
          },
          { new: true } // Return the updated document
        );
  
        if (!updatedVideo) {
          return res.status(404).json({ message: "Video model not found" });
        }
  
        return res.status(200).json({
          message: "Video updated successfully",
          video: updatedVideo,
        });
      } catch (error) {
        console.error("Error updating video in MongoDB:", error);
        return res.status(500).json({ message: "MongoDB update error" });
      }
    } catch (error) {
      console.error("Error updating video:", error);
      return res.status(500).json({ message: "Server error" });
    }
  };
  


  export const getVideosByCourse = async (req,res)=>{
    try{
      const {courseId} = req.params;

      const course = await Course.findById(courseId);
      if(!course)
      {
        return res.status(404).json({message:'Course not found'});
      }

      const playlist = course.playlist.filter((id)=>id.trim() !== '');
      
      const videos = await Video.find({videoId:{$in:playlist}});
      res.status(200).json({
        videos,
      });
    }
    catch(error){
      console.error('Error fetching videos by course:', error);
      res.status(500).json({message:'Server error'});
    }
  }