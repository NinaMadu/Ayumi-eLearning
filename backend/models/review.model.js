import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
    {
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"User",
    
        },

        course:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Course",  

        },

        description:{
            type:String,
            require:true,

        },

        rating:{
            type:Number,
            require:true,

        },

    }
,{timestamps:true});


const Review = mongoose.model("Review", reviewSchema);

export default Review;
