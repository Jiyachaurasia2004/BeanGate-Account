const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();
const sendEmail = async (email,subject,message) => {
    const transporter = nodemailer.createTransport({
        host:"smtp.gmail.com",
        port:587,
        secure:false,
        auth:{
            user:process.env.MY_EMAIL,
            pass:process.env.MY_PASS
        }
    });

    await transporter.sendMail({
        from:process.env.MY_EMAIL,
        to:email,
        subject,
        text:message
    })
}
module.exports = sendEmail;