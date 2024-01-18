const express = require('express')
const {createCategory, updateCategory} = require('../controllers/blogCategoryController')
const router = express.Router()

router.post('/', createCategory)
router.post('/:id', updateCategory)

module.exports = router