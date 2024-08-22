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
        enum:["Free", "Paid"],//may be changed
        type: String,
        required: true,
    },
    Pricing: {
        type: Number,
        required: true,
    },
    courseVisibility:{
        type: Boolean,  //true or false
        required: true,
    },
    instructor:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Instructor",
    },
    courseImage:{
        type: String,
        default: 'https://z-p3-scontent.fcmb7-1.fna.fbcdn.net/v/t39.30808-6/327184563_728635795343703_7126554849022607658_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHEnAUSOqTqsAdzjz_IKMP4rzyO0eeMYlWvPI7R54xiVcAlRCGCnd7v6t_gWaYv4LJJrfSUeWnkHSy4RsP6nY8B&_nc_ohc=TfRLKvWJRscQ7kNvgE1Zuge&_nc_zt=23&_nc_ht=z-p3-scontent.fcmb7-1.fna&oh=00_AYCDFl8NwSsS7EJjS2icj_L7dh7KOaTLnwcC1OAl_Vl9HA&oe=66CC42E7',
    },
    courseIntro:{
        type: String,
    },
    courseMaterials:{
        type: [String],
    },
    embedMedia:{
        type: String,
    },
    references:{
        type: String,
    }
    
    

},{timestamps: true});

const Course = mongoose.model("Course", courseSchema);

export default Course;