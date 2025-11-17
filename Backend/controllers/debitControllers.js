const Debit = require("../models/debit")

const debitFrom = async(req,res)=>{
    try {
        const {name,email,contact,amount,from,termsAccepted} = req.body;

        const newCredit = await Debit.create({
          name,email,contact,amount,from,termsAccepted
        })
        res.status(200).json({message:"Debit form submitted successfully",newCredit})
    } catch (error) {
        res.status(500).json({message:error})
    }
}
exports.debitFrom = debitFrom;
