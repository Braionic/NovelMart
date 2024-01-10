const userModel = require("../models/userModel");

const unblockUser = (req, res) => {
  const id = req.params.id;
  userModel
    .findOneAndUpdate({ _id: id }, { isBlocked: false })
    .then((User) => {
      res.status(200).json(User);
    })
    .catch((err) => {
      res.status(404).json({ msg: err });
    });
};
module.exports = unblockUser;
