const express = require("express")
const {getAllUsers,getAllCredit, getAllDebit, makeAdmin} = require("../controllers/adminController")
const {auth} = require("../middleware/auth")
const adminMiddleware = require("../middleware/adminMiddleware")
const router = express.Router();

router.get("/user",auth,adminMiddleware, getAllUsers);
router.get("/credit",auth,adminMiddleware,getAllCredit);
router.get("/debit",getAllDebit);
router.put("/make-admin/:userId", auth,makeAdmin);
module.exports = router;