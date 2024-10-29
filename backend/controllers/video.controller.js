
import Video from "../models/video.model.js";
import { storage } from "../firebase/firebaseAdmin.js";
import axios from 'axios'; 
// import {  ref , deleteObject } from 'firebase/storage';
import dotenv from 'dotenv';


dotenv.config();

const accessToken = process.env.VITE_ACCESS_TOKEN;

const headerPost = {
    Accept: 'application/vnd.vimeo.*+json;version=3.4',
    Authorization: `bearer ${accessToken}`,
    'Content-Type': 'application/json'
};


export const uploadVideo = async (req,res)=>{
    try{
        const {title, description, thumbnailUrl, videoId} = req.body;

        const newVideo = new Video ({
            title,
            description,
            thumbnailUrl,
            videoId

        })


        await newVideo.save();

        return res.status(201).json({
            message: 'Video uploaded successfully',
            video: newVideo
        })

       

    }
    catch(error){

        console.error('Error uploading video:', error);
        res.status(500).json({message:'Server error'});
    }
};


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