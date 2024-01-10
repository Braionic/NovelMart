const mongoose = require("mongoose");
const userModel = require("../models/userModel");
mongoose;

const deleteUser = (req, res) => {
  const id = req.params;
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
