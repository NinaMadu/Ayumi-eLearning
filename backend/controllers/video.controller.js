
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
}