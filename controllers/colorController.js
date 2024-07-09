const colorModel = require("../models/colorModel");

const createColor = async (req, res) => {
  try {
    const newColor = await colorModel.create(req.body);
    if (newColor) {
      return res.json(newColor);
    }
  } catch (error) {
    return res.json({ msg: error.message });
  }
};

const updateColor = async (req, res) => {
  const { id } = req.params;
  try {
    const modifyColor = await colorModel.findByIdAndUpdate(
      id,
      { title: req.body.title },
      { new: true }
    );
    if (modifyColor) {
      return res.json(modifyColor);
    }
  } catch (error) {
    res.json({ msg: error });
  }
};

const getColors = async (req, res) => {
  try {
    const colors = await colorModel.find({});
    if (colors) {
      res.json(colors);
    }
  } catch (error) {
    res.json({ msg: error });
  }
};

const getSingleColor = async (req, res) => {
  const getColor = await colorModel.find({
    title: { $regex: new RegExp("^" + req.query.title.toLowerCase(), "i") },
  });
  if (getColor) {
    return res.json(getColor);
  }
};

const deleteColor = async (req, res) => {
  try {
    const delColor = await colorModel.findOneAndDelete(req.params.id);
    if (delColor) {
      res.json(delColor);
    } else {
      res.json("no color with such ID was fount");
    }
  } catch (error) {
    res.json({ msg: error });
  }
};
module.exports = { createColor, updateColor, getColors, deleteColor, getSingleColor };
