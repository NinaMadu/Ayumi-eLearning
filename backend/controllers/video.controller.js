
import Video from "../models/video.model.js";


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
     //mongodb delete
     const videoId = req.params.id;
     //1. find 
     //2.delete
     const deletedVideo = await Video.findByIdAndDelete({videoId});
     if(!deletedVideo)  
     {
        return res.status(404).json({message:'Video not found'});
     }
     return res.status(200).json({
        message: 'Video deleted successfully',
        video: deletedVideo
    })

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