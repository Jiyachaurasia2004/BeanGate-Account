const express = require("express");
const { creditSchema } = require("../models/validators");
const validate  = require("../middleware/validator");
const { creditFrom } = require("../controllers/creditControllers");

const router = express.Router();

router.post("/credit",validate(creditSchema), creditFrom);

module.exports = router;