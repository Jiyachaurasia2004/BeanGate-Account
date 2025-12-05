const User = require('../models/auth');
const Credit = require('../models/credit');
const Debit =require('../models/debit');
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password -confirmPassword -__v");

    if (users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    res.status(200).json({ users });

  } catch (error) {
    next(error);
  }
};


const getAllCredit= async(req, res) => {
    try {
         const credit = await Credit.find();
            if(!credit && credit.length ===0){
                return res.status(404).json({message: "No Credit found"});
            }
            res.status(200).json({credits: credit});
    } catch (error) {
        next(error);
    }
}
const getAllDebit= async(req, res) => {
    try {
         const debit = await Debit.find();
            if(!debit && debit.length ===0){
                return res.status(404).json({message: "No Debit found"});
            }
            res.status(200).json({Debits: debit});
    } catch (error) {
        next(error);
    }
}
module.exports = { getAllUsers, getAllCredit,getAllDebit };