const Credit = require("../models/credit");

const creditFrom = async (req, res) => {
   const user = req.user;    
    const userId = req.userId;
  try {
    const {
      date,
      voucherNo,
      transactionType,
      description,
      amount,
      paidBy,
      paymentMode,
      name,
      category,
      reimbursementStatus,
      remarks,
      termsAccepted,
    } = req.body;

    const newCredit = await Credit.create({
       userId: userId,        
      date,
      voucherNo,
      transactionType,
      description,
      amount,
      paidBy,
      paymentMode,
      name,
      category,
      reimbursementStatus,
      remarks,
      termsAccepted,
    });
    res
      .status(200)
      .json({ message: "Credit form submitted successfully", newCredit });
  } catch (error) {
      console.error(error); 
    res.status(500).json({ message: error });
  }
};
exports.creditFrom = creditFrom;
