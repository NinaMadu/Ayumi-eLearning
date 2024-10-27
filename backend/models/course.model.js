import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        enum:[], // should be  added
        required: true,
    },
    difficultyLevel: {
        type: String,
        enum:["Beginner", "Intermediate", "Advanced"], //may be changed
        required: true,
    },
    prerequisites: {
        type: [String],
        required: true,
    },
    courseObjectives: {
        type: [String],
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
    enrollmentOptions: {
        //may be changed
        type: String,
        required: true,
    },
    Pricing: {
        type: number,
        required: true,
    },
    courseVisibility:{
        type: Boolean,  //true or false
        required: true,
    },
    courseMaterials:{
        type: [String],

    },
    playlist:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Playlist",
    },

    instructor:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Instructor",
    },
    

},{timestamps: true});

const Course = mongoose.model("Course", courseSchema);

export default Course;