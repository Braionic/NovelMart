const express = require("express");
const {createBrand, allBrands, deleteBrand, updateBrand, getSingleBrand, getOneBrand} = require("../controllers/brandController");
const router = express.Router();

router.post("/", createBrand);
router.put('/:id', updateBrand)
router.delete('/:id', deleteBrand)
router.get('/', allBrands)
router.get('/single', getSingleBrand)
router.get('/single/:id', getOneBrand)

module.exports = router;
