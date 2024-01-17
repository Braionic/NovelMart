const { json } = require("express");
const blogModel = require("../models/BlogModel");
const { isValidObjectId, default: mongoose } = require("mongoose");
const { isIdValid } = require("../helpers/helperFunctions");
const { findOneAndUpdate } = require("../models/productModel");

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

//Get All Blog Posts
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

//Get a Single Blog
const getSingleBlog = async (req, res) => {
  const { id } = req.params;
  if (!isIdValid(id)) {
    return res.json({ msg: "ID is not valid" });
  }
  try {
    const getABlog = await blogModel.findOne({
      _id: new mongoose.Types.ObjectId(id),
    });
    //increment number of views for this post by one
    const numViews = await blogModel.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(id) },
      { $inc: { pageViews: 1 } }
    );
    if (numViews) {
      console.log(numViews);
    }
    if (getABlog) {
      return res.status(200).json(getABlog);
    } else {
      res.status(404).json({ msg: "blog not found" });
    }
  } catch (error) {
    console.log(error);
  }
};

//Update Blog Post
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
//Delete a blog post
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

const likeBlogPost = async (req, res) => {
  const blogId = req.body.id;
  const user = req.id;
  const likedPost = await blogModel.findById(blogId);
  const isliked = likedPost.isLiked;
  const isDisliked = likedPost.dislikes.find(
    (userId) => userId.toString() == user.toString()
  );
  if (isDisliked) {
    try {
      const updateDislike = await blogModel.findByIdAndUpdate(
        blogId,
        { $pull: { dislikes: user }, isDisliked: false },
        { new: true }
      );
      if (updateDislike) {
        console.log(updateDislike);
      }
    } catch (error) {
      console.log(error);
    }
  }
  if (isliked) {
    try {
      const removeLike = await blogModel.findByIdAndUpdate(
        blogId,
        { $pull: { likes: user }, isLiked: false },
        { new: true }
      );
      if (removeLike) {
        return res.json(removeLike);
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      const likeThePost = await blogModel.findByIdAndUpdate(
        blogId,
        { $push: { likes: user }, isLiked: true },
        { new: true }
      );
      if (likeThePost) {
        return res.json(likeThePost);
      }
    } catch (error) {
      console.log(error);
    }
  }
};
module.exports = {
  postBlog,
  getBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
  likeBlogPost,
};
