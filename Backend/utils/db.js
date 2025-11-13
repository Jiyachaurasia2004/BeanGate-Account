const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');

const URL = process.env.MONGODB_URL;
const connectDB = async () => { 
    try {
        mongoose.connect(URL);
        console.log("Database connected successfully");
    } catch (error) {
        console.log("Error while connecting to database", error.message);
        
    }
}

module.exports = connectDB;