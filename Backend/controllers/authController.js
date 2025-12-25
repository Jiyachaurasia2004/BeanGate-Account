const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/auth");
const OTP = require("../models/otp");
const { generatejwt } = require("../utils/token");
const wrapAsync = require("../utils/wrapAsync");
const sendEmail = require("../utils/sendEmail");
require("dotenv").config();

const registerUser = wrapAsync(async (req, res) => {
  const {
    username,
    email,
    phone,
    password,
    department,
    post,
    gender,
    confirmPassword,
    termsAccepted,
    isAdmin,
  } = req.body;

  const userExist = await User.findOne({ email });
  if (userExist) return res.status(400).json({ message: "User already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);

  const userCreated = await User.create({
    username,
    email,
    phone,
    department,
    gender,
    post,
    password: hashedPassword,
    confirmPassword: hashedPassword,
    termsAccepted,
    isAdmin: isAdmin || false,
  });

  const token = generatejwt(userCreated._id);

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, 
  });

  res.status(201).json({
    message: "User registered successfully",
    user: {
      id: userCreated._id,
      username: userCreated.username,
      email: userCreated.email,
      phone: userCreated.phone,
      department: userCreated.department,
      post: userCreated.post,
      gender: userCreated.gender,
      termsAccepted: userCreated.termsAccepted,
    },
    token,
  });
});

const loginUser = wrapAsync(async (req, res) => {
  const { email, password } = req.body;
  const userExist = await User.findOne({ email });
  if (!userExist) return res.status(400).json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, userExist.password);
  if (!isMatch) return res.status(400).json({ message: "Password does not match" });

  const token = generatejwt(userExist._id);

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    message: "Login successful",
    userId: userExist._id,
    username: userExist.username,
   token,
  });
});

const handleForgetPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

  const otp = Math.floor(100000 + Math.random() * 900000);
  const newOTP = new OTP({ otp, email });
  const message = `Your OTP for password reset is ${otp}. It is valid for 10 minutes.`;

  await sendEmail(email, "Password Reset OTP", message);
  await newOTP.save();

  res.status(200).json({ success: true, message: "OTP sent to your email" });
};


const handleVerifyOTP = async (req, res) => {
  const { otp } = req.body;
  const existingOTP = await OTP.findOne({ otp: Number(otp) });

  if (!existingOTP || Date.now() > existingOTP.createdAt.getTime() + 10 * 60 * 1000) {
    return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
  }

  res.status(200).json({ success: true, message: "OTP verified successfully" });
};

const handleResetPassword = async (req, res) => {
  const { otp, newPassword, confirmPassword } = req.body;

  if (!otp || !newPassword || !confirmPassword) {
    return res.status(400).json({ success: false, message: "All fields required" });
  }
  if (newPassword !== confirmPassword) {
    return res.status(400).json({ success: false, message: "Passwords do not match" });
  }

  const existingOTP = await OTP.findOne({ otp: Number(otp) });
  if (!existingOTP) return res.status(400).json({ success: false, message: "Invalid OTP" });

  const isExpired = Date.now() > existingOTP.createdAt.getTime() + 10 * 60 * 1000;
  if (isExpired) {
    await OTP.deleteOne({ _id: existingOTP._id });
    return res.status(400).json({ success: false, message: "OTP expired" });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await User.updateOne({ email: existingOTP.email }, { password: hashedPassword });
  await OTP.deleteMany({ email: existingOTP.email });

  res.status(200).json({ success: true, message: "Password reset successfully" });
};


const logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Successfully logged out" });
};

module.exports = {
  registerUser,
  loginUser,
  handleForgetPassword,
  handleVerifyOTP,
  handleResetPassword,
  logout,
};
