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
        required: true,
    },
   
    difficulty: {
        type: String,
        enum:["Beginner", "Intermediate", "Advanced"],
        required: true,
    },
    prerequisites: {
        type: [String],
        required: true,
    },
    objectives: {
        type: [String],
        required: true,
    },
    customDuration: {
        type: String,
        required: true,
    },
    durationUnit: {
        type: String,
        required: true,
    },
    enrollmentOptions: {
        type: String,
        required: true,
    },
    customPrice: {
        type: mongoose.Schema.Types.Decimal128,
        required: true,
        default: 0.0
    },
    priceUnit: {
        type: String,
        required: true,
    },
    visibility:{
        type: String,  
        required: true,
        default: 'private'
    },
    introImage: {
        type: String,
        required: true,
    },
    introVideo: {
        type: String,
        required: true,
    },
    reference: {
        type: [String],
    },
    courseMaterial:{
        type: [String],
    },
    playlist:{
        type: [String],        
    },

    instructor:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Instructor",
        required: true
    },
    students:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
    },
    

},{timestamps: true});

const Course = mongoose.model("Course", courseSchema);

export default Course;