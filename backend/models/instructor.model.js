
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
        avatar: {
            type: String,
            default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
        },  
        isAdmin: {
            type: Boolean,
            default: false,
        },

    },{timestamps: true});

const Instructor = mongoose.model("Instructor", instructorSchema);

export default Instructor;