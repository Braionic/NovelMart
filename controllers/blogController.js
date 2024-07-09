const { json } = require("express");
const fs = require("fs");
const blogModel = require("../models/BlogModel");
const { isValidObjectId, default: mongoose } = require("mongoose");
const { isIdValid } = require("../helpers/helperFunctions");
const {
  findOneAndUpdate,
  findById,
  findByIdAndUpdate,
} = require("../models/productModel");
const uploadImage = require("../helpers/cloudinary");

const postBlog = async (req, res) => {
  try {
    const blog = new blogModel(req.body);

    const saveBlog = await blog.save();
    if (saveBlog) {
      return res.status(200).json(saveBlog);
    }
  } catch (error) {
    return res.status(404).json(error)
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

//like a blog post
const likeBlogPost = async (req, res) => {
  const blogId = req.body?.id;
  const user = req.id;
  try {
    const likedPost = await blogModel.findById(blogId);
    const isliked = likedPost.isLiked;
    const isDisliked = likedPost.dislikes.find(
      (userId) => userId.toString() == user.toString()
    );
    if (isDisliked) {
      const removeDislike = await blogModel.findByIdAndUpdate(
        blogId,
        { $pull: { dislikes: user }, isDisliked: false },
        { new: true }
      );
      if (removeDislike) {
        console.log("a remove like event has occured in the background");
      }
    }

    if (isliked) {
      const removeLike = await blogModel.findByIdAndUpdate(
        blogId,
        { $pull: { likes: user }, isLiked: false },
        { new: true }
      );
      if (removeLike) {
        return res.json(removeLike);
      }
    } else {
      const likePost = await blogModel
        .findByIdAndUpdate(
          blogId,
          { $push: { likes: user }, isLiked: true },
          { new: true }
        )
        .populate("likes");

      if (likePost) {
        return res.json(likePost);
      }
    }
  } catch (error) {
    res.json({ msg: error.message });
  }
};
// dislike Blog Post
const dislikeBlogPost = async (req, res) => {
  const blogId = req.body?.id;
  const user = req.id;

  try {
    const blogPost = await blogModel.findById(blogId);
    const isDisliked = blogPost.isDisliked;

    const checkIfLiked = blogPost.likes.find(
      (userId) => userId.toString() == user.toString()
    );
    console.log(blogPost.likes, "check is liked");
    if (checkIfLiked) {
      const removeLike = await blogModel.findByIdAndUpdate(
        blogId,
        { $push: { likes: user }, isDisliked: true },
        { new: true }
      );
      if (removeLike) {
        console.log("an unlike event has taken place");
      }
    }

    if (isDisliked) {
      const addDislike = await blogModel.findByIdAndUpdate(
        blogId,
        { $pull: { dislikes: user }, isDisliked: false },
        { new: true }
      );
      if (addDislike) {
        return res.json(addDislike);
      }
    } else {
      const removeDislike = await blogModel
        .findByIdAndUpdate(
          blogId,
          { $push: { dislikes: user }, isDisliked: true },
          { new: true }
        )
        .populate("dislikes");
      if (removeDislike) {
        return res.json(removeDislike);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const uploadcategoryImage = async (req, res) => {
  try {
    const uploader = (path) => uploadImage(path, "images");
    const files = req.files;
    const blogId = req.params.id;
    const url = [];
    for (const file of files) {
      const imageUrl = await uploader(file.path);
      url.push(imageUrl);
      console.log(file.path);
      fs.unlinkSync(file.path);
    }
    console.log(url, "urlllllll");
    const uploadimage = await blogModel.findByIdAndUpdate(
      blogId,
      { imageURL: url.map((uri) => uri) },
      { new: true }
    );
    if (uploadimage) {
      res.json(uploadimage);
    }
  } catch (error) {
    res.json(error);
  }
};
module.exports = {
  postBlog,
  getBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
  likeBlogPost,
  dislikeBlogPost,
  uploadcategoryImage,
};
