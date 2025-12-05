const dotenv = require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken');
const User = require('../models/auth');

const auth = async (req, res, next) => {
  try {
    // 1️⃣ Get token from header or cookie
    let token;
    const authHeader = req.header("Authorization");

    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.replace("Bearer ", "").trim();
    } else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    // 2️⃣ No token found
    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    // 3️⃣ Verify token
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Verified token:", verified);

    // 4️⃣ Find user in DB by ID (assuming token was signed with { id: user._id })
    const userData = await User.findById(verified.id).select("-password -confirmPassword -__v");
    console.log("User data:", userData);

    if (!userData) {
      return res.status(401).json({ error: "User not found" });
    }

    // 5️⃣ Attach to req object
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
