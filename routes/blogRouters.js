const express = require('express')
const {postBlog, getBlogs, getSingleBlog, updateBlog, deleteBlog} = require('../controllers/blogController')
const router = express.Router()

router.post('/', postBlog)
router.get('/', getBlogs)
router.get('/:id', getSingleBlog)
router.patch('/', updateBlog)
router.delete('/:id', deleteBlog)

module.exports = router