const express = require("express");
const {createBrand, allBrands, deleteBrand, updateBrand} = require("../controllers/brandController");
const router = express.Router();

router.post("/", createBrand);
router.put('/:id', updateBrand)
router.delete('/:id', deleteBrand)
router.get('/', allBrands)

module.exports = router;
