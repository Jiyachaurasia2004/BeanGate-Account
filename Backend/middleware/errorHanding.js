const dotenv = require('dotenv');
dotenv.config();
module.exports = (err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Internal Server Error";
    const extraDetails = err.extraDetails || "Error occurred on the server";

   return res.status(status).json({ message, extraDetails });
}
