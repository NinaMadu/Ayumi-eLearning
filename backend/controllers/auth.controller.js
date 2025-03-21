import User from "../models/user.model.js";
import Instructor from "../models/instructor.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER, // Store in .env
        pass: process.env.EMAIL_PASS, // Store in .env
    },
});

export const signup = async (req, res, next) => {
    try {
        const { firstName, lastName, email, password, bDay, gender, phone } = req.body;

        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return next(errorHandler(409, "Email already in use. Please use a different email."));
        }

        // Hash password
        const hashedPassword = await bcryptjs.hash(password, 10);
        const newUser = new User({
            firstName, lastName, email, password: hashedPassword, bDay, gender, phone
        });

        await newUser.save();

        // Send Welcome Email
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Welcome to Our Platform!",
            html: `
                <h2>Welcome, ${firstName}!</h2>
                <p>Thank you for signing up. We’re excited to have you on board.</p>
                <p>Here are your details:</p>
                <ul>
                    <li><strong>Name:</strong> ${firstName} ${lastName}</li>
                    <li><strong>Email:</strong> ${email}</li>
                    <li><strong>Phone:</strong> ${phone}</li>
                </ul>
                <p>Enjoy our services!</p>
            `,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) console.error("Email sending failed:", error);
            else console.log("Email sent:", info.response);
        });

        res.status(201).json({ success: true, message: "User created successfully. Confirmation email sent." });

    } catch (error) {
        next(errorHandler(500, "Something went wrong. Please try again later."));
    }
};

export const adminSignup = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        // Hash password
        const hashedPassword = await bcryptjs.hash(password, 10);

        const newAdmin = new Instructor({
            name,
            email,
            password: hashedPassword,
            bio: "Admin account",
        });

        await newAdmin.save();
        res.status(201).json({ success: true, message: "Admin account created successfully" });

    } catch (error) {
        if (error.name === "ValidationError") {
            next(errorHandler(400, "Invalid input data. Please check your entries."));
        } else if (error.code === 11000) {
            next(errorHandler(409, "Email is already in use. Please use a different email."));
        } else {
            next(errorHandler(500, "Something went wrong. Please try again later."));
        }
    }
};

export const signin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        let validUser = await Instructor.findOne({ email }) || await User.findOne({ email });

        if (!validUser) return next(errorHandler(404, "User not found"));

        const validPassword = await bcryptjs.compare(password, validUser.password);
        if (!validPassword) return next(errorHandler(401, "Invalid password"));

        const token = jwt.sign({ id: validUser._id, isInstructor: validUser instanceof Instructor }, process.env.JWT_SECRET, { expiresIn: "7d" });

        const { password: pass, ...userData } = validUser._doc;

        res.cookie("access_token", token, { httpOnly: true, secure: true, sameSite: "Strict" })
            .status(200)
            .json({ ...userData, isInstructor: validUser instanceof Instructor });

    } catch (error) {
        return next(errorHandler(500, "An unexpected error occurred. Please try again later."));
    }
};

export const signOut = async (req, res, next) => {
    try {
        res.clearCookie("access_token", { httpOnly: true, secure: true, sameSite: "Strict" });
        res.status(200).json({ message: "User has been logged out!" });
    } catch (error) {
        return next(errorHandler(500, "An unexpected error occurred while logging out."));
    }
};
