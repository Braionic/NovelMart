const userModel = require("../models/userModel");

const updateUser = (req, res) => {
  const id = req.params.id;
  const { name, email, mobile } = req.body;
  const incomingDetails = {
    name: name,
    email: email,
    mobile: mobile,
  };
  userModel
    .findOneAndUpdate({_id: id}, incomingDetails)
    .then((user) => {
      res.status(200).json(user);
    })
    .then((err) => {
      res.status(404).json({ msg: err });
    });
};

module.exports =updateUser