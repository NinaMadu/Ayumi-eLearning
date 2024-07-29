import User from "../models/user.model";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error";

export const signup = async (req, res, next) => {
    const { firstName, lastName, email, password, bDay, gender} = req.body;    
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ firstName, lastName, email, hashedPassword, bDay, gender});
    try {
        await newUser.save();
        res.status(201).json("User created successfully")
    } catch (error) {
        next(errorHandler(500, error.message));
    }

};