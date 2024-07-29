const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
import authRouter from "./routes/auth.route.js";

dotenv.config();

mongoose.connect(process.env.MONGO).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log("Error: " + err);
})

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("listening to port", PORT)
})

app.use('/api/auth', authRouter);

