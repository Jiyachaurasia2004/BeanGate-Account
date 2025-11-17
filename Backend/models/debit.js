const mongoose = require("mongoose")

const debitSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true 
    },
    email:{
        type: String,
        required: true 
    },
    contact:{
        type: Number,
        required: true 
    },
    amount:{
        type: Number,
        required: true 
    },
    from:{
        type: String,
        required: true
    },
     termsAccepted: {     // <-- checkbox field
        type: Boolean,
        required: true,
        default: false
    }
},{timestamps:true})

module.exports = mongoose.model('Debit', debitSchema);