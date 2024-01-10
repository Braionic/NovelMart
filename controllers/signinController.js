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
        if (isauser.isPasswordMatched(password)/*isauser.password === password*/) {
          const token = jwt.sign({ id: isauser._id }, process.env.SECRETE_KEY, {
            algorithm: "HS256",
            expiresIn: process.env.ACCESS_TOKEN_LIFE,
          });
          return res.json({ data: isauser, token: token });
        } else {
          res.json("incorrect password");
        }
      } else {
        res.json("you are not a user");
      }
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = signinController;
