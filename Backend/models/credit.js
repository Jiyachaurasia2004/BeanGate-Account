const mongoose = require("mongoose")

const creditSchema = new mongoose.Schema({
   userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

    date: {
      type: Date,
      required: true,
    },

    voucherNo: {
      type: String,
      trim: true,
    },

    transactionType: {
      type: String,
      enum: ["credit", "expense"],
      required: true,
      default: "credit",
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    paidBy: {
      type: String,
      trim: true,
    },

    name: {
      type: String,
      trim: true,
      required:true
    },

    paymentMode: {
      type: String,
      enum: ["cash", "upi", "bank", "card"],
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    reimbursementStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    remarks: {
      type: String,
      trim: true,
    },
     termsAccepted: {   
        type: Boolean,
        required: true,
        default: false
    }
},{timestamps:true})

module.exports = mongoose.model('Credit', creditSchema);
