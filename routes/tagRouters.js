const express = require("express");
const {createTag, allTags, deleteTag, updateTag, getSingleTag, getOneTag} = require("../controllers/tagController");
const router = express.Router();

router.post("/create", createTag);
router.put('/:id', updateTag)
router.delete('/:id', deleteTag)
router.get('/', allTags)
router.get('/single', getSingleTag)
router.get('/single/:id', getOneTag)

module.exports = router;
