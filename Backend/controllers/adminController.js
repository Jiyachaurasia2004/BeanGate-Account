const User = require('../models/auth');
const Credit = require('../models/credit');
const Debit = require('../models/debit');

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password -confirmPassword -__v");

    if (users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }
   console.log(users);
   
    res.status(200).json({message: users });
  } catch (error) {
    next(error);
    
  }
  
  
};

const getAllCredit = async (req, res, next) => {
  try {
   const credits = await Credit.find().populate("userId", "email phone");


    if (credits.length === 0) {
      return res.status(404).json({ message: "No credits found" });
    }

    res.status(200).json({ credits });
  } catch (error) {
    next(error);
  }
};

const getAllDebit = async (req, res, next) => {
  try {
    const debits = await Debit.find();

    if (!debits || debits.length === 0) {
      return res.status(404).json({ message: "No debits found" });
    }

    res.status(200).json({ debits });
  } catch (error) {
    next(error);
  }
};

const makeAdmin = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findByIdAndUpdate(
      userId,
      { isAdmin: true },
      { new: true }
    ).select("-password -confirmPassword");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      message: "User is now admin",
      user,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { getAllUsers, getAllCredit, getAllDebit,makeAdmin };
