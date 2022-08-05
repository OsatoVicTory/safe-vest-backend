const express = require("express");
const google = require("./googleauth.js");
const linkedin = require("./linkedinauth.js");
const router = express.Router();

router.use("/google", google);
router.use("/LinkedIn", linkedin);

module.exports = router;