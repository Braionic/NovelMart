const express = require('express')
const {createCategory, updateCategory, deleteCategory, allCategory} = require('../controllers/blogCategoryController')
const router = express.Router()

router.post('/', createCategory)
router.put('/:id', updateCategory)
router.delete('/:id', deleteCategory)
router.get('/', allCategory)


module.exports = router