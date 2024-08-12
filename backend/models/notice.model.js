import mongoose from "mongoose";

const noticeSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            required:true,
        },
        description:{
            type:String,
            required:true,
        },
        image:{
            type:String,
            required:true,
        },
        

    },{timestamps:true}
);

const Notice = mongoose.model("Notice", noticeSchema);

export default Notice;