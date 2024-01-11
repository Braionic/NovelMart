const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose')

const refreshController = async (req, res) => {
  console.log(`this is the refresh token ${req.cookies.refreshToken}`);
  if (!req.cookies?.refreshToken) {
    return res.status(404).json({ msg: "no refresh token" });
  }
  const refreshToken = req.cookies.refreshToken;
  const user = await userModel.findOne({ refreshToken: refreshToken });
  if (!user) {
    return res.status(404).json({ msg: "no token was found in the database" });
  }
  jwt.verify(refreshToken, process.env.SECRETE_KEY, (err, decode) => {
    if (err) {
      console.log(err);
      return res.send("invalid token");
    }
    console.log(user._id);

    console.log(`decoded ${decode.id}`);
    if (user._id == decode.id) {
      jwt.sign(
        { id: user.id },
        process.env.SECRETE_KEY,
        { expiresIn: process.env.REFRESH_TOKEN },
        (err, accessToken) => {
          res.status(200).json({ accessToken });
        }
      );
    }
  });
};
module.exports = refreshController;
