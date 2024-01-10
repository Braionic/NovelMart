const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const { isValidObjectId } = require("mongoose");

module.exports = {
  authMiddleWare: (req, res, next) => {
    const isTokenPresent = req.headers["authorization"]?.split(" ")[1];
    console.log(isTokenPresent);
    if (isTokenPresent) {
      jwt.verify(
        isTokenPresent,
        process.env.SECRETE_KEY,
        function (err, decoded) {
          if (err) {
            res.json({ auth: false, message: err });
          } else {
            req.id = decoded.id;
            return next();
          }
          //req.username = decoded.username;
        }
      );
    } else {
      console.log("token not present or expired, please sign in");
      res.json({ msg: "token not found or expired" });
    }
  },
  isAdmin: async (req, res, next) => {
    const id = req.id;
    const user = await userModel.findOne({ _id: id, role: "admin" });
    if (!user) {
      return res.json({ msg: "you are not an admin" });
    } else {
      return next();
    }
  },
};
