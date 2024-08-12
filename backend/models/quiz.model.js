import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({

    difficultyLevel:{

        type:String,        
        required:true,

    },

    questions:{        
            type:[mongoose.Schema.Types.ObjectId],
            ref:"Question",       

    },

    instructor:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Instructor",

    },

    duration:{
        type:Number,
        required:true,

    },

    course:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Course",

    },



},{timestamps:true});
    
const Quiz = mongoose.model("Quiz", quizSchema);
export default Quiz;