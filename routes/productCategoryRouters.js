const express = require('express')
const createCategoty = require('../controllers/productCategoryController')
const router = express.Router()

router.post('/', createCategoty)


module.exports = router