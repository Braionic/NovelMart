const express = require('express')
const {createCategoty, deleteCategory, updateCategory, allCategory} = require('../controllers/productCategoryController')
const router = express.Router()

router.post('/', createCategoty)
router.delete('/:id', deleteCategory)
router.put('/:id', updateCategory)
router.get('/', allCategory)


module.exports = router