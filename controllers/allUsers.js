const userModel = require("../models/userModel");

const allUsers = (req, res) => {
  const users = userModel
    .find({})
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => console.log(err));
};

module.exports = allUsers;
