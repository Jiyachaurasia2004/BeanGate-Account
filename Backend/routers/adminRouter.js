const express = require("express")
const {getAllUsers,getAllCredit, getAllDebit} = require("../controllers/adminController")
const {auth} = require("../middleware/auth")
const adminMiddleware = require("../middleware/adminMiddleware")
const router = express.Router();

router.get("/user",auth, getAllUsers);
router.get("/credit",auth,getAllCredit);
router.get("/debit",auth,getAllDebit);
module.exports = router;