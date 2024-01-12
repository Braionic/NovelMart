const express = require('express')
const productRouter = express.Router()
const {uploadProduct, getProducts} = require('../controllers/productControllers')

productRouter.post('/', uploadProduct)
productRouter.get('/', getProducts)


module.exports = productRouter