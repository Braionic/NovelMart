const isIdValid = require("../helpers/helperFunctions");
const userModel = require("../models/userModel");

const updateUser = (req, res) => {
  const id = req.params.id;
  if (!isIdValid(id)) {
    return res.status(404).json({msg: "you entered an invalid id"})
  }
  const { name, email, mobile } = req.body;
  const incomingDetails = {
    name: name && name,
    email: email && email,
    mobile: mobile && mobile,
  };
  userModel
    .findOneAndUpdate({ _id: id }, incomingDetails)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ msg: "user not found" });
      } else {
        return res.status(200).json(user);
      }
    })
    .catch((err) => {
      res.status(404).json({ msg: err.message });
    });
};

module.exports = updateUser;
