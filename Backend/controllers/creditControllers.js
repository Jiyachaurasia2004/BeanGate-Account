const Credit = require("../models/credit");

const creditFrom = async (req, res) => {
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
    res.status(500).json({ message: error });
  }
};
exports.creditFrom = creditFrom;
