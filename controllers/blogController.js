const { json } = require("express");
const blogModel = require("../models/BlogModel");
const { isValidObjectId, default: mongoose } = require("mongoose");
const { isIdValid } = require("../helpers/helperFunctions");

const postBlog = async (req, res) => {
  try {
    const blog = new blogModel(req.body);

    const saveBlog = await blog.save();
    if (saveBlog) {
      return res.status(400).json(saveBlog);
    }
  } catch (error) {
    console.log(error);
  }
};

const getBlogs = async (req, res) => {
  try {
    const allblogs = await blogModel.find({});
    if (allblogs) {
      return res.status(200).json(allblogs);
    }
  } catch (error) {
    console.log(error);
  }
};

const getSingleBlog = async (req, res) => {
  const { id } = req.params;
  if (!isIdValid(id)) {
    return res.json({ msg: "ID is not valid" });
  }
  try {
    const getABlog = await blogModel.findOne({
      _id: new mongoose.Types.ObjectId(id),
    });
    if (getABlog) {
      return res.status(200).json(getABlog);
    } else {
      res.status(404).json({ msg: "blog not found" });
    }
  } catch (error) {
    console.log(error);
  }
};

const updateBlog = async (req, res) => {
  const { id } = req.body;
  if (!isIdValid(id)) {
    return res.json({ msg: "invalid ID" });
  }
  try {
    const updateBlog = await blogModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (updateBlog) {
      return res.status(200).json(updateBlog);
    } else {
      res.status(404).json({ msg: "no user with such ID" });
    }
  } catch (error) {
    console.log(error);
  }
};

const deleteBlog = async (req, res) => {
  const { id } = req.params;
  if (!isIdValid(id)) {
    return res.json({ msg: "invalid iD" });
  }
  try {
    const deletedblog = await blogModel.findByIdAndDelete(id);
    if (deletedblog) {
      return res.status(200).json(deletedblog);
    } else {
      res.status(404).json({ msg: "no blog with such ID" });
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports = { postBlog, getBlogs, getSingleBlog, updateBlog, deleteBlog };
