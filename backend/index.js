const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.MONGO).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log("Error: " + err);
})

const app = express();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("listening to port 3000")
})



