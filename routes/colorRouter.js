const express = require('express')
const {createColor, updateColor, getColors, deleteColor} = require('../controllers/colorController')
const router = express.Router()

router.post('/', createColor)
router.get('/', getColors)
router.put('/updatecolor/:id', updateColor)
router.delete('/deleteColor/:id', deleteColor)

module.exports = router

