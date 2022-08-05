const express = require("express");
const cors = require("cors");
const controller = require("./controller.js");

require('dotenv').config();
const router = express.Router();

router.get("/", (req, res) => {
    controller.getSigned().then(response => {
        res.json({ response });
    });
});

module.exports = router;