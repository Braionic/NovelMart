const isIdValid = require("../helpers/helperFunctions");
const userModel = require("../models/userModel");

const blockUser = (req, res) => {
  const id = req.params.id;
  if (!isIdValid(id)) {
    return res.status(404).json({msg: "you entered an invalid id"})
  }
  userModel
    .findOneAndUpdate({ _id: id }, { isBlocked: true })
    .then((BlockedUser) => {
      res.status(200).json(BlockedUser);
    })
    .catch((err) => {
      res.status(404).json({ msg: err });
    });
};
module.exports = blockUser;
