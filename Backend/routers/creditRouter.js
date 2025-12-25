const express = require("express");
const { creditSchema } = require("../models/validators");
const validate  = require("../middleware/validator");
const { creditFrom } = require("../controllers/creditControllers");
const { auth } = require("../middleware/auth");
const adminMiddleware = require("../middleware/adminMiddleware");


const router = express.Router();

router.post("/credit",validate(creditSchema),auth, creditFrom);

module.exports = router;