const userModel = require("../models/userModel");

const blockUser = (req, res) => {
  const id = req.params.id;
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
