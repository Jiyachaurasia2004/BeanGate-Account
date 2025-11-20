const express = require("express")
const {getAllUsers,getAllCredit, getAllDebit} = require("../controllers/adminController")
const {auth} = require("../middleware/auth")
const adminMiddleware = require("../middleware/adminMiddleware")
const router = express.Router();

router.get("/user",getAllUsers);
router.get("/credit",getAllCredit);
router.get("/debit",getAllDebit);
module.exports = router;