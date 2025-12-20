const dotenv = require('dotenv');
dotenv.config();
const express = require("express");
const connectDB = require('./utils/db');
const routerCredit = require('./routers/creditRouter');
const app = express();
const cors = require('cors');
const errorHanding = require('./middleware/errorHanding');
const routerDebit = require('./routers/debitRouter');
const routerAuth = require("./routers/authRouter")
const routerAdmin = require("./routers/adminRouter")
const cookieParser = require("cookie-parser");
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true, 
      allowedHeaders: ["Authorization", "Content-Type"]
}));
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth",routerAuth)
app.use("/api/form",routerCredit);
app.use("/api/form",routerDebit);
app.use("/api/admin",routerAdmin)
app.use(errorHanding);
const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    connectDB();
    console.log(`Server is running on port ${PORT}`);
})


// http://localhost:5173