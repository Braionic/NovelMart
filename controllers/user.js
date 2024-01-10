const userModel = require("../models/userModel");

const user = (req, res) => {
  const {id} = req.params;
  console.log(id)
  userModel
    .findById(id)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(400).json({ msg: err });
    });
};

module.exports = user;
