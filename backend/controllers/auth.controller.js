import User from "../models/user.model.js";
import Instructor from "../models/instructor.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
    const { firstName, lastName, email, password, bDay, gender, phone} = req.body;    
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ firstName, lastName, email, password: hashedPassword, bDay, gender, phone});
    try {
        await newUser.save();
        res.status(201).json("User created successfully")
    } catch (error) {
        if (error.name === 'ValidationError') {
            next(errorHandler(400, "Invalid input data. Please check your entries."));
        } else if (error.code === 11000) { 
            next(errorHandler(409, "Your email already used. Please use a different email."));
        } else {
            next(errorHandler(500, "Something went wrong. Please try again later."));
        }
    }
};

export const adminSignup = async (req, res, next) => {
    const { name, email, password } = req.body;
    
    const hashedPassword = bcryptjs.hashSync(password, 10);
    
    const newAdmin = new Instructor({
        name,
        email,
        password: hashedPassword,
        bio: "Admin account",        
    });

    try {
        await newAdmin.save();
        res.status(201).json("Admin account created successfully");
    } catch (error) {
        if (error.name === 'ValidationError') {
            next(errorHandler(400, "Invalid input data. Please check your entries."));
        } else if (error.code === 11000) { 
            next(errorHandler(409, "Email is already in use. Please use a different email."));
        } else {
            next(errorHandler(500, "Something went wrong. Please try again later."));
        }
    }
};

export const signin = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        let validUser;
        let isInstructor = false;
        
        validUser = await Instructor.findOne({ email });
        if (validUser) {
            isInstructor = true;
        } else {
            validUser = await User.findOne({ email });
        }

        if (!validUser) return next(errorHandler(404, "User not found"));

        if (!isInstructor && !validUser.isActive) {
            return res.status(403).json({ message: "Account is deactivated. Please contact support." });
        }

        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) return next(errorHandler(401, "Invalid password"));

        if (validUser) {
            validUser.isActive = true; // Update instance property
            validUser.isLoggedIn=true;
            await validUser.save(); // Save the specific user instance
        }

        const token = jwt.sign({ id: validUser._id, isInstructor }, process.env.JWT_SECRET);
        
        const { password: pass, ...rest } = validUser._doc;

        res.cookie('access_token', token, { httpOnly: true }).status(200).json({ ...rest, isInstructor });

        // if (!validUser|| !validUser.isActive) {
        //     return res.status(403).json({ message: "Account is deactivated or user not found" });
        //   }

    } catch (error) {
        return next(errorHandler(500, "An unexpected error occurred. Please try again later."));
    }
};



export const signOut = async (req, res, next) => {
    try {
        const { userId } = req.body; 

        if (!userId) {
            return res.status(400).json("User ID is required for logout.");
        }
        const validUser = await User.findById(userId) || await Instructor.findById(userId);

        if (!validUser) {
            return res.status(404).json("User not found");
        }

        // Update user status to inactive
        //validUser.isActive = false;
        validUser.isLoggedIn = false;
        await validUser.save(); 

        // Clear the access token cookie
        res.clearCookie('access_token', { httpOnly: true});

        // Send success response
        return res.status(200).json("User has been logged out!");
    } catch (error) {
        
        console.error(error);
        return next(error);
    }
};

