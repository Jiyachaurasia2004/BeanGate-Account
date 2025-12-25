const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");
const User = require("../models/auth");

const auth = async (req, res, next) => {
  try {
    let token;
    const authHeader = req.header("Authorization");

    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.replace("Bearer ", "").trim();
    } else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);

    const userData = await User.findById(verified.id).select(
      "-password -confirmPassword -__v"
    );


    if (!userData) {
      return res.status(401).json({ error: "User not found" });
    }

     req.token = token;
    req.user = userData;
    req.userId = userData._id.toString();
    
    next();
  } catch (error) {
    console.log("Auth middleware error:", error);
    return res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = { auth };
