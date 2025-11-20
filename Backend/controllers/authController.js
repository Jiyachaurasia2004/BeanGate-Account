const express = require("express");
const { set } = require("mongoose");
const User = require("../models/auth");
const bcrypt = require("bcrypt");
const { generatejwt } = require("../utils/token");
const wrapAsync = require("../utils/wrapAsync");
const OTP = require("../models/otp");
const sendEmail = require("../utils/sendEmail");


require("dotenv").config();
const registerUser = wrapAsync(async (req, res) => {
  try {
    const { username, email,phone, password,confirmPassword ,termsAccepted} = req.body;

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hash_password = await bcrypt.hash(password, 10);

    const userCreated = await User.create({
      username,
      email,
      phone,
      password: hash_password,
      confirmPassword: hash_password,
      termsAccepted
    });

    const token = generatejwt(userCreated._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: userCreated._id,
        username: userCreated.username,
        email: userCreated.email,
        phone: userCreated.phone,
         termsAccepted:userCreated.termsAccepted
      },
      token,
    });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({
      message: "Error while registering user",
      error: error.message,
    });
  }
});

const loginUser = wrapAsync(async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(400).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, userExist.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    let token;
    try {
      token = generatejwt(userExist._id);
      console.log(token);
    } catch (error) {
      console.log(error);
    }

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
      message: "Login successful",
      userId: userExist._id,
      username: userExist.username,
      email: userExist.email,
      token,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error while logging in", error: error.message });
  }
});


const handleForgetPassword = async(req,res)=>{
 try {
   const {email} = req.body;

   const user = await User.findOne({email});
   if(!user){
       res.status(404).json({msg:"User with this email does not exist"});
       return;
   }
   const otp = Math.floor(100000 + Math.random() * 900000);
   console.log("otp generate",otp);
   const newOTP = new OTP({
        otp:otp,
        email:email
   })
   const message = `Your OTP for password reset is ${otp}. It is valid for 10 minutes. If you did not request this, please ignore this email.`;
  
   await sendEmail(email,"Password Reset OTP",message);
   await newOTP.save();
   res.status(200).json({success:true,message:"OTP sent to your email"});

 } catch (error) {
    res.status(500).json({success:false,message:"internal error",error: error.message})
 }
}

const handleVerifyOTP = async(req,res)=>{
  try {
    const {otp} = req.body;

    const existingOTP = await OTP.findOne({otp:otp});
    if(!existingOTP || Date.now() > existingOTP.createdAt.getTime() + 60*60*1000){
        res.status(400).json({success:false,message:"Invalid OTP"});
        return;
    } 
    res.status(200).json({success:true,message:"OTP verified successfully"});
  } catch (error) {
      res.status(500).json({success:false,message:"internal error"})
  }
}

const handleResetPassword = async(req,res)=>{
  try {
    const {email,newPassword,confirmPassword} = req.body;

    // const existingOTP = await OTP.findOne({email:email,otp:otp});
    //  if(!existingOTP || Date.now() > existingOTP.createdAt.getTime() + 60*60*1000){
    //     res.status(400).json({success:false,message:"Invalid OTP"});
    //     return;
    // } 
    const user = await User.findOne({email:email});
    if(!user){
        res.status(404).json({success:false,message:"User not found"});
        return;
    }
    if (newPassword !== confirmPassword) {
    res.status(400).json({ success: false, message: "Passwords do not match" });
    return;
}
    const hashedPassword = await bcrypt.hash(newPassword,8);

    user.password = hashedPassword;
    user.confirmPassword = hashedPassword;
    
    await user.save();

    await OTP.deleteMany({email:email});
    res.status(200).json({success:true,message:"Password reset successfully"});
  } catch (error) {
     res.status(500).json({success:false,message:"internal error"})
  }
}

 const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "successfully logouts" });
  } catch (error) {
    console.log(error);

    return res.status(400).json({ message: "logout error" });
  }
};
module.exports = { registerUser, loginUser, handleForgetPassword,handleVerifyOTP,handleResetPassword,logout };
