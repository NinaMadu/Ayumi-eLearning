import User from "../models/user.model.js";
import Instructor from "../models/instructor.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ----------------- SIGNUP --------------------
export const signup = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, bDay, gender, phone } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(errorHandler(409, "Email already in use. Please use a different email."));
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1d' });

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      bDay,
      gender,
      phone,
      verificationToken,
      verificationTokenExpires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    await newUser.save();

    const verificationUrl = `${process.env.CLIENT_URL}/verify-email?token=${verificationToken}`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verify Your Email Address",
      html: `
        <h2>Welcome, ${firstName}!</h2>
        <p>Please verify your email address to activate your account.</p>
        <a href="${verificationUrl}" style="padding:10px 20px; background-color:#1a365d; color:white; text-decoration:none; border-radius:5px;">Verify Email</a>
        <p>This link will expire in 24 hours.</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({ 
      success: true, 
      message: "User created successfully. Verification email sent." 
    });

  } catch (error) {
    next(errorHandler(500, "Something went wrong. Please try again later."));
  }
};


// ----------------- VERIFY EMAIL --------------------
export const verifyEmail = async (req, res, next) => {
    try {
      const { token } = req.query;
  
      if (!token) return next(errorHandler(400, "Verification token is required"));
  
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
      const user = await User.findOne({ 
        email: decoded.email,
        verificationToken: token,
        verificationTokenExpires: { $gt: new Date() }
      });
  
      if (!user) {
        return res.redirect(`${process.env.CLIENT_URL}/verify-email?success=false&message=Invalid or expired verification token`);
      }
  
      // ✅ Mark user as active/verified
      user.isActive = true;
      await user.save();
  
      // ✅ Clear token and expiry
      user.verificationToken = undefined;
      user.verificationTokenExpires = undefined;
  
      await user.save();
  
      // ✅ Send confirmation email (optional)
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: "Your Account is Now Active!",
        html: `
          <h2>Welcome, ${user.firstName || 'User'}!</h2>
          <p>Your account has been successfully verified and is now active.</p>
          <p>You can now log in.</p>
        `,
      });
  
      // ✅ Redirect to frontend
      res.redirect(`${process.env.CLIENT_URL}/verify-email?success=true`);
  
    } catch (error) {
      let message = "Something went wrong. Please try again later.";
      if (error.name === 'TokenExpiredError') {
        message = "Verification token has expired";
      } else if (error.name === 'JsonWebTokenError') {
        message = "Invalid verification token";
      }
      res.redirect(`${process.env.CLIENT_URL}/verify-email?success=false&message=${encodeURIComponent(message)}`);
    }
  };
  
// ----------------- RESEND VERIFICATION --------------------
export const resendVerification = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return next(errorHandler(404, "User not found"));
    if (user.isActive) return next(errorHandler(400, "Account is already active"));

    const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1d' });

    user.verificationToken = verificationToken;
    user.verificationTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);
    await user.save();

    const verificationUrl = `${process.env.CLIENT_URL}/verify-email?token=${verificationToken}`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verify Your Email Address",
      html: `
        <h2>Hello, ${user.firstName}!</h2>
        <p>Here’s your new verification link:</p>
        <a href="${verificationUrl}" style="padding:10px 20px; background-color:#1a365d; color:white; text-decoration:none; border-radius:5px;">Verify Email</a>
        <p>This link will expire in 24 hours.</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: "Verification email resent successfully." });

  } catch (error) {
    next(errorHandler(500, "Something went wrong. Please try again later."));
  }
};

// ----------------- ADMIN SIGNUP --------------------
export const adminSignup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

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

// ----------------- SIGN IN --------------------
export const signin = async (req, res, next) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
      }
  
      const instructor = await Instructor.findOne({ email });
      const user = instructor ? null : await User.findOne({ email });
  
      const validUser = instructor || user;
  
      if (!validUser) {
        return res.status(404).json({ message: "User not found" });
      }
  
      if (!instructor && !validUser.isActive) {
        return res.status(401).json({
          message: "Account not activated. Please verify your email.",
          needVerification: true,
          email: validUser.email
        });
      }
  
      const isPasswordValid = await bcryptjs.compare(password, validUser.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid password" });
      }
  
      const isInstructor = validUser.constructor.modelName === "Instructor";
      const token = jwt.sign(
        { id: validUser._id, isInstructor, email: validUser.email },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );
  
      const userData = validUser.toObject();
      delete userData.password;
  
      res
        .cookie("access_token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "Strict",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        .status(200)
        .json({ ...userData, isInstructor, accessToken: token });
  
    } catch (error) {
      console.error("Signin error:", error.message || error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  

// ----------------- SIGN OUT --------------------
export const signOut = async (req, res, next) => {
  try {
    res.clearCookie("access_token", { httpOnly: true, secure: true, sameSite: "Strict" });
    res.status(200).json({ message: "User has been logged out!" });
  } catch (error) {
    return next(errorHandler(500, "An unexpected error occurred while logging out."));
  }
};
