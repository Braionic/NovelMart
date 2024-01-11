const mongoose = require("mongoose");
const userModel = require("../models/userModel");
const isIdValid = require("../helpers/helperFunctions");
const generateRefreshToken = require("../helpers/generateRefreshToken");
const generateToken = require("../helpers/generateToken");
const jwt = require("jsonwebtoken");

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

const adminSignupController = async (req, res) => {
  const { name, email, password, mobile } = req.body;
  const User = new userModel(req.body);

  try {
    const savedData = await User.save();
    res.json(savedData);
  } catch (error) {
    res.json(`error: ${error}`);
  }
};

const logoutHandler = async (req, res) => {
  if (!req.cookies?.refreshToken) {
    res.clearCookie("refreshToken", { httpOnly: true });
    return res.sendStatus(403);
  }
  const refreshToken = req.cookies.refreshToken;

  try {
    const updateResult = await userModel.findOneAndUpdate(
      { refreshToken },
      { refreshToken: "" },
      { new: true }
    );
    res.clearCookie("refreshToken", { httpOnly: true });
  } catch (error) {
    console.log(error);
  }
  res.sendStatus(403);
};

const allUsers = (req, res) => {
  const users = userModel
    .find({})
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => console.log(err));
};

const blockUser = (req, res) => {
  const id = req.params.id;
  if (!isIdValid(id)) {
    return res.status(404).json({ msg: "you entered an invalid id" });
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

const deleteUser = (req, res) => {
  const id = req.params;
  if (!isIdValid(id)) {
    return res.status(404).json({ msg: "you entered an invalid id" });
  }
  userModel
    .findOneAndDelete({ _id: new mongoose.Types.ObjectId(id) })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      res.json({ msg: err });
    });
};

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

const unblockUser = (req, res) => {
  const id = req.params.id;
  if (!isIdValid(id)) {
    return res.status(404).json({ msg: "you entered an invalid id" });
  }
  userModel
    .findOneAndUpdate({ _id: id }, { isBlocked: false })
    .then((User) => {
      res.status(200).json(User);
    })
    .catch((err) => {
      res.status(404).json({ msg: err });
    });
};

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

  const signupController = async (req, res)=>{
    const {name, email, password, mobile} = req.body
    const User = new userModel(req.body)
    try {
        const savedData = await User.save()
        res.json(savedData)
    } catch (error) {
        res.json(`error: ${error}`)
    }
}

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

  
module.exports = {
  logoutHandler,
  adminSignupController,
  allUsers,
  blockUser,
  deleteUser,
  signinController,
  refreshController,
  unblockUser,
  user,
  signupController,
  updateUser
};
