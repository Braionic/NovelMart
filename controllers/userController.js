const mongoose = require("mongoose");
const userModel = require("../models/userModel");
const { isIdValid, sendEmail } = require("../helpers/helperFunctions");
const generateRefreshToken = require("../helpers/generateRefreshToken");
const crypto = require("crypto");
const generateToken = require("../helpers/generateToken");
const jwt = require("jsonwebtoken");

//Generate refresh token
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

//signup an Admin
const adminSignupController = async (req, res) => {
  const { name, email, password, mobile } = req.body;
  const User = new userModel(req.body);

  try {
    const savedData = await User.save();
    if (savedData) {
      savedData.role = "admin";
      await User.save();
      res.json(savedData);
    }
  } catch (error) {
    res.json(`error: ${error}`);
  }
};

//logout a user
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

//get all users
const allUsers = (req, res) => {
  const users = userModel
    .find({})
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => console.log(err));
};

//Block a user
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

//Delete a user
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

//signin a user
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

//signin an Admin

const adminSigninController = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      res.json({ msg: "user and password field should not be empty" });
    } else {
      const isAdmin = await userModel.findOne({ email: email });
      if (isAdmin.role !== "admin") {
        return res.json("you are not authourized");
      }
      if (isAdmin) {
        console.log(isAdmin);

        if (isAdmin.isPasswordMatched(password)) {
          try {
            const updatedData = await userModel.findOneAndUpdate(
              { email: email },
              { refreshToken: await generateRefreshToken(isAdmin._id) },
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
            data: isAdmin,
            token: generateToken(isAdmin?._id),
          });
        } else {
          res.json("incorrect password");
        }
      } else {
        res.json("you are not an Admin, please signup");
      }
    }
  } catch (error) {
    console.log(error);
  }
};

//unblock a user
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

//get a single user
const user = (req, res) => {
  const { id } = req.params;
  console.log(id);
  userModel
    .findById(id)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(400).json({ msg: err });
    });
};

//create a user account
const signupController = async (req, res) => {
  const { name, email, password, mobile } = req.body;
  const User = new userModel(req.body);
  try {
    const savedData = await User.save();
    res.json(savedData);
  } catch (error) {
    res.json(`error: ${error}`);
  }
};

//update user
const updateUser = (req, res) => {
  const id = req.params.id;
  if (!isIdValid(id)) {
    return res.status(404).json({ msg: "you entered an invalid id" });
  }
  const { name, email, mobile, role } = req.body;
  const incomingDetails = {
    name: name && name,
    email: email && email,
    mobile: mobile && mobile,
    role: role && role,
  };
  userModel
    .findOneAndUpdate({ _id: id }, incomingDetails, { new: true })
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

//change Password
const changePassword = async (req, res) => {
  const id = req.id;
  const password = req.body.password;
  console.log(password);
  try {
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({ msg: "you dont have access to this page" });
    }
    if (password) {
      user.password = password;
      user.passwordLastModified = Date.now();
      const passwordChanged = await user.save();
      res.status(200).json(passwordChanged);
    }
  } catch (error) {
    console.log(error);
  }
};

//reset password token
const resetPasswordToken = async (req, res) => {
  const userEmail = req.body.email;
  const user = await userModel.findOne({ email: userEmail });
  if (!user) {
    return res.status(404).json({ msg: "no user with such details" });
  }
  if (userEmail) {
    const token = await user.generateToken();
    console.log(token);
    const data = {
      to: user.email,
      from: '"Novel commerce" <admin@fedalogistics.co.za>',
      resetUrl: `you have requested a link to reset your password, please click on the link <a href="http://localhost:1000/api/user/resetPasswordToken/${token}">Click here</a>`,
    };
    const userSaved = await user.save();
    console.log(userSaved);
    sendEmail(data);
    return res.status(200).json({ token });
  } else {
    return res.status(404).json({ msg: "email must be provided" });
  }
};

//check user pasword refresh token
const passwordTokenCheck = async (req, res) => {
  const userToken = req.params.token;
  const password = req.body?.password;
  const digestedToken = crypto
    .createHash("sha256")
    .update(userToken)
    .digest("hex");
  console.log(digestedToken, "new token");
  const user = await userModel.findOne({
    resetPasswordToken: digestedToken,
    passwordTokenExpiration: { $gte: Date.now() },
  });
  if (!user) {
    return res.status(404).json({
      msg: "token expire or no user was found, please request a new token",
      data: user,
    });
  }
  if (password) {
    user.password = password;
    user.passwordTokenExpiration = "";
    user.resetPasswordToken = undefined;
    const userSaved = await user.save();
    return res.status(200).json(userSaved);
  } else {
    return res.status(404).json({ msg: "your new password must be specified" });
  }
};

const getWishlist = async (req, res)=>{
  const wishlist = await userModel.findById(req.body.id).populate('wishList')
  if(wishlist){
    res.json(wishlist)
  }
}

const saveAddress = async (req, res)=> {
  console.log(req.params.id)
  const {id} = req.params
  const {address} = req.body
  const updateAdress = await userModel.findOneAndUpdate({_id: new mongoose.Types.ObjectId(id)}, {address: address}, {new: true})
  if(updateAdress){
    res.json(updateAdress)
  }
}
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
  updateUser,
  changePassword,
  resetPasswordToken,
  passwordTokenCheck,
  adminSigninController,
  getWishlist,
  saveAddress
};
