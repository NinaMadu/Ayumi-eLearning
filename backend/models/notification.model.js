import mongoose from "mongoose";


const notificationSchema = new mongoose.Schema(
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

    },{timestamps:true}
);


const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;