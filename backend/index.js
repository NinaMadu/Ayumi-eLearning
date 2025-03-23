import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./routes/auth.route.js";
import noticeRoutes from "./routes/admin.routes/notice.routes.js";
import userRoutes from "./routes/admin.routes/user.routes.js";
import courseRoutes from "./routes/admin.routes/course.routes.js";
import quizRoutes from "./routes/admin.routes/quiz.routes.js";
import videoRoutes from "./routes/video.route.js";
import userDetailRoutes from "./routes/userDetail.routes.js";
import instructorDetailRoutes from "./routes/instructorDetail.route.js";
import instructorRoutes from "./routes/admin.routes/instructor.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import reviewRoutes from "./routes/review.route.js";
import discussion from "./routes/discussion.route.js";
import message from "./routes/message.route.js";
import assignmentRoutes from "./routes/admin.routes/assignment.routes.js";
import submissionRoutes from "./routes/submission.route.js";
import quizAttemptRoutes from "./routes/quizAttempt.route.js";

dotenv.config();

mongoose.connect(process.env.MONGO).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log("Error: " + err);
})

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    credentials: true, 
  }));
//app.use(cookieParser());

app.use('/api/auth', authRouter);
app.use('/api/notices', noticeRoutes);
app.use('/api/users' , userRoutes);
app.use('/api/course', courseRoutes);
app.use('/api/quiz', quizRoutes)
app.use('/api/' , videoRoutes);
app.use('/api/profile', userDetailRoutes);
app.use('/api/instructorProfile', instructorDetailRoutes);
app.use('/api/instructor', instructorRoutes);
app.use("/api/reviews",reviewRoutes );
app.use('/api/payment',paymentRoutes);
app.use("/api/discussion",discussion);
app.use('/api/message', message);
app.use('/api/assignments', assignmentRoutes);
app.use('/api/submissions', submissionRoutes);
app.use("/api/quiz-attempts",quizAttemptRoutes);


 // Use user routes

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("listening to port", PORT)
})

app.use((err, req, res, next) => {
    const statusCode = err.status || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({ success: false, message });
  });


