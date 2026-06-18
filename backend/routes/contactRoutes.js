const express = require("express");
const router = express.Router();

const optionalAuth = require("../middleware/optionalAuth");
const { createContactMessage } = require("../controllers/contactController");

router.post("/", optionalAuth, createContactMessage);

module.exports = router;
