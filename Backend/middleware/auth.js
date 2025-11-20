const dotenv = require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken');
const User = require('../models/auth');

const auth = async (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) return res.status(401).json({ error: "No Authorization header provided" });

  const token = authHeader.replace("Bearer ", "").trim();

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded);

    const userData = await User.findById(decoded.id).select("-password");
 
   
    if (!userData) {
      return res.status(401).json({ error: "User not found" });
    }

    req.token = token;
    req.user = userData;
    next();

  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: "Invalid token" });
  }
};


module.exports = { auth };
