const { default: mongoose } = require("mongoose");
const tagModel = require("../models/tagModel");

//get all blog categories
const allTags = async (req, res) => {
  try {
    const tags = await tagModel.find({});
    if (tags) {
      res.json(tags);
    }
  } catch (error) {
    res.json({ msg: error.message });
  }
};

const getOneTag = async (req, res) => {
  try {
    const tag = await tagModel.findOne({_id: req.params.id})
    if (tag) {
      return res.status(201).json(tag);
    }
  } catch (error) {
   return res.status(404).json(error);
  }
};

const getSingleTag = async (req, res) => {
  console.log("this is the req", req.query);
  try {
    const tags = await tagModel.find({
      title: { $regex: new RegExp("^" + req.query?.title.toLowerCase(), "i") },
    });
    if (tags) {
      res.status(200).json(tags);
    }
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};

const createTag = async (req, res) => {
  console.log(req.body);
  try {
    const tagExist = await tagModel.find({ title: req.body.title });

    if (tagExist.length > 0) {
      return res.status(406).json(`${tagExist[0].title} already exist`);
    }
    const createCategory = new tagModel(req.body);
    const saveCategory = await createCategory.save();
    if (saveCategory) {
      return res.status(201).json(saveCategory);
    }
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const updateTag = async (req, res) => {
  const id = req.params.id;

  try {
    const tags = await tagModel.findByIdAndUpdate(
      new mongoose.Types.ObjectId(id),
      { title: req.body?.title },
      {
        new: true,
      }
    );

    if (tags) {
      res.json(tags);
    } else {
      res.json({ msg: "Tag not found" });
    }
  } catch (error) {
    res.json({ msg: error.message });
  }
};

//delete a blog category

const deleteTag = async (req, res) => {
  const id = req.params?.id;
  try {
    const deletedtag = await tagModel.findByIdAndDelete(id);
    if (deletedtag) {
      res.json(deletedtag);
    } else {
      res.json({ msg: "no Tag was found" });
    }
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = {
  createTag,
  allTags,
  updateTag,
  deleteTag,
  getSingleTag,
  getOneTag
};
