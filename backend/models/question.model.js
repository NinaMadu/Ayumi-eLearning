import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    description:{
        type:String,
        required:true,
    },

    answers:{
        type:[String],
        required:true,
    },

    correctAnswer:{
        type:String,
        required:true,
    },

},{timestamps:true});


const Question = mongoose.model("Question", questionSchema);

export default Question;