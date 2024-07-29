import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";

dotenv.config();

mongoose.connect(process.env.MONGO).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log("Error: " + err);
})

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRouter);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("listening to port", PORT)
})


