const generateRefreshToken = require("../helpers/generateRefreshToken");
const generateToken = require("../helpers/generateToken");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const signinController = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      res.json({ msg: "user and password field should not be empty" });
    } else {
      const isauser = await userModel.findOne({ email: email });
      if (isauser) {
        console.log(isauser);

        if (isauser.isPasswordMatched(password)) {
          try {
            const updatedData = await userModel.findOneAndUpdate(
              { email: email },
              { refreshToken: await generateRefreshToken(isauser._id) },
              { new: true }
            );
            console.log(updatedData);
            if (updatedData) {
              res.cookie("refreshToken", updatedData.refreshToken, {
                maxAge: 24 * 60 * 60 * 1000,
                httpOnly: true,
              });
            } else {
              console.log("not updated");
            }
          } catch (error) {
            console.log(error);
          }

          return res.json({
            data: isauser,
            token: generateToken(isauser?._id),
          });
        } else {
          res.json("incorrect password");
        }
      } else {
        res.json("you are not a user, please signup");
      }
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = signinController;
