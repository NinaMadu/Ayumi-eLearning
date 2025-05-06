
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,            
        },
        lastName: {
            type: String,
            required: false,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true
        },
        bDay: {
            type: String,
            required: false,            
        },
        gender: {
            type: String,
            required: false,            
        },
        phone: {
            type: String,
            required: false,            
        },
        isLoggedIn: { 
            type: Boolean, 
            default: false 
        },     
        avatar: {
            type: String,
            default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
        },  
        isActive: {
            type: Boolean,
            default: false,
        },
        verificationToken: {
            type: String,
        },
        verificationTokenExpires: {
            type: Date,
        },
        favorities: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "Course",
            default: [],
        },
        enrolledCourses: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "Course",
            default: [],
        } 
    }, { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
