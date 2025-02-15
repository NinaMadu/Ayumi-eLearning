import mongoose from "mongoose";

const userProgressSchema = new mongoose.Schema(
    {
        userId:{

            type: mongoose.Schema.Types.ObjectId,
            ref:"User" ,
            required: true,

        },
        courseId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Course",
            required: true,


        },
        watchedVideos:[
            {
                videoId:{
                    type: String,
                    required:true,

                },
                watchedTime:{
                    type:Number,
                    default:0,

                }
            }
        ],
    },
    {timestamps: true}
);


const UserProgress = mongoose.model("UserProgress", userProgressSchema);
export default UserProgress;