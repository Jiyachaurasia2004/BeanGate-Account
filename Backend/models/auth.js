const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const userSchema = new mongoose.Schema({
    username: {
        type: String,   
        required: true,
    },
    email: {
        type: String,       
        required: true,
        unique: true
    },
    phone:{
        type: String,       
        required: true,
        unique: true
    },
    password: {
        type: String,       
        required: true
    },
    confirmPassword:{
        type: String,       
        required: true
    },
     termsAccepted: {   
        type: Boolean,
        required: true,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const User = new mongoose.model('User', userSchema);
module.exports = User;