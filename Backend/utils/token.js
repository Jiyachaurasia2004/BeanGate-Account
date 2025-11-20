const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const user = require("../models/auth");
dotenv.config();

const generatejwt = (id) => {
 const token = jwt.sign({  id }, process.env.JWT_SECRET, { expiresIn: '30d' });

  
  return token;
};

exports.generatejwt = generatejwt;
