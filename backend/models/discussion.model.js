import mongoose from "mongoose";

const discussionSchema = new mongoose.Schema(
    {
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"User",

        },
        
        massage:{
            type:String,
            require:true,
        }
        

    },{timestamps:true}
);

const Discussion = mongoose.model("Discussion", discussionSchema);

export default Discussion;