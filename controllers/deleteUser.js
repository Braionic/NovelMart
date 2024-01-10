const mongoose = require("mongoose");
const userModel = require("../models/userModel");
const isIdValid = require("../helpers/helperFunctions");

const deleteUser = (req, res) => {
  const id = req.params;
  if (!isIdValid(id)) {
    return res.status(404).json({msg: "you entered an invalid id"})
  }
  userModel
    .findOneAndDelete({ _id: new mongoose.Types.ObjectId(id) })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      res.json({ msg: err });
    });
};

module.exports = deleteUser;
