const Credit = require("../models/credit")

const debitFrom = async(req,res)=>{
    try {
        const {name,email,contact,amount,from} = req.body;

        const newCredit = await Credit.create({
          name,email,contact,amount,from
        })
        res.status(200).json({message:"Debit form submitted successfully",newCredit})
    } catch (error) {
        res.status(500).json({message:error})
    }
}
exports.debitFrom = debitFrom;
