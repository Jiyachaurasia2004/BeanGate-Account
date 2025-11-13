
const express = require("express");
const { DebitSchema } = require("../models/validators");
const validate  = require("../middleware/validator");
const { debitFrom } = require("../controllers/debitControllers");

const router = express.Router();

router.post("/debit",validate(DebitSchema), debitFrom);

module.exports = router;