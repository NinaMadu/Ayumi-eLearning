
import mongoose from "mongoose";

const instructorSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
        },
        bio:{
            type:String,
            required:true,

        },
        contact:{
            type:[String],  //["email", "phone number"]
            required:true,

        },
        experience:{
            type:[String],
            required:true,

        },
        qualifications:{
            type:[String],
            required:true,

        },

    },{timestamps: true});

const Instructor = mongoose.model("Instructor", instructorSchema);

export default Instructor;