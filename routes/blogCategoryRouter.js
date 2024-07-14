const express = require('express')
const {createCategory, updateCategory, deleteCategory, allCategory, getSingleCat, getSingleCategory} = require('../controllers/blogCategoryController')
const router = express.Router()

router.post('/', createCategory)
router.put('/:id', updateCategory)
router.delete('/:id', deleteCategory)
router.get('/', allCategory)
router.get('/single', getSingleCat)
router.get('/single/:id', getSingleCategory)

module.exports = router