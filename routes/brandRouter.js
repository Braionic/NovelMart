const express = require("express");
const createBrand = require("../controllers/brandController");
const router = express.Router();

router.post("/", createBrand);

module.exports = router;
