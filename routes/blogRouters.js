const express = require("express");
const {
  postBlog,
  getBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
  likeBlogPost,
  dislikeBlogPost,
  uploadcategoryImage,
} = require("../controllers/blogController");
const { authMiddleWare } = require("../helpers/middlewares");
const {
  resizeProductImage,
  resizecategoryImage,
  upload,
} = require("../helpers/uploadImages");
const router = express.Router();

router.post("/", postBlog);
router.get("/", getBlogs);
router.get("/:id", getSingleBlog);
router.patch("/", updateBlog);
router.delete("/:id", deleteBlog);
router.put("/like", authMiddleWare, likeBlogPost);
router.put("/dislike", authMiddleWare, dislikeBlogPost);
router.post(
  "/uploadImages/:id",
  upload.array("images", 10),
  resizecategoryImage,
  uploadcategoryImage
);

module.exports = router;
