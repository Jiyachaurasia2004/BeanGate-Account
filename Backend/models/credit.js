const mongoose = require("mongoose")

const creditSchema = new mongoose.Schema({
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
     termsAccepted: {   
        type: Boolean,
        required: true,
        default: false
    }
},{timestamps:true})

module.exports = mongoose.model('Credit', creditSchema);