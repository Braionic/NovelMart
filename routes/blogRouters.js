const express = require('express')
const {postBlog, getBlogs, getSingleBlog, updateBlog, deleteBlog, likeBlogPost} = require('../controllers/blogController')
const { authMiddleWare } = require('../helpers/middlewares')
const router = express.Router()

router.post('/', postBlog)
router.get('/', getBlogs)
router.get('/:id', getSingleBlog)
router.patch('/', updateBlog)
router.delete('/:id', deleteBlog)
router.put('/', authMiddleWare, likeBlogPost)

module.exports = router