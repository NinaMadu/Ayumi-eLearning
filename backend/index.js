import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js";
import videoRouter from "./routes/video.route.js";
import courseRouter from "./routes/admin.routes/course.routes.js";
import noticeRoutes from "./routes/admin.routes/notice.routes.js";

import cookieParser from "cookie-parser";
import noticeRoutes from "./routes/admin.routes/notice.routes.js";
import userRoutes from "./routes/profile.routes.js";

dotenv.config();

mongoose.connect(process.env.MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error: " + err);
  });

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));
app.use(cookieParser());

app.use('/api/auth', authRouter);
app.use('/api/course', courseRouter);
app.use('/api/notices', noticeRoutes);
app.use('/api',videoRouter);

app.use('/api/profile', userRoutes); // Use user routes

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({ success: false, message });
});
