
import mongoose from "mongoose";

const instructorSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
        },
        email:{
            type:String,
            required:true,
            unique: true,
        },
        password:{
            type:String,
            required:true,
        },
        bio:{
            type:String,
        },
        phone:{
            type:[String],            
         },
        experience:{
            type:[String],
        },
        qualifications:{
            type:[String],    
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },

    },{timestamps: true});

const Instructor = mongoose.model("Instructor", instructorSchema);

export default Instructor;