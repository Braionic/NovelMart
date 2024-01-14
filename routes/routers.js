const express = require("express");
const router = express.Router();
const { authMiddleWare, isAdmin } = require("../helpers/middlewares");
const {
  signupController,
  signinController,
  allUsers,
  user,
  updateUser,
  blockUser,
  unblockUser,
  logoutHandler,
  refreshController,
  deleteUser,
  changePassword,
  resetPasswordToken,
  passwordTokenCheck,
} = require("../controllers/userController");

router.get("/", (req, res) => {
  res.json("this is now the home");
});
router.post("/signup", signupController);
router.post("/adminSignup", signupController);
router.post("/signin", signinController);
router.post("/refresh", refreshController);
router.get("/all-users", authMiddleWare, isAdmin, allUsers);
router.get("/user/:id", authMiddleWare, user);
router.patch("/updateUser/:id", authMiddleWare, updateUser);
router.patch("/blockUser/:id", authMiddleWare, isAdmin, blockUser);
router.patch("/unblockUser/:id", authMiddleWare, isAdmin, unblockUser);
router.delete("/deleteUser/:id", authMiddleWare, isAdmin, deleteUser);
router.patch("/updatePassword", authMiddleWare, changePassword)
router.post("/resetPasswordToken", resetPasswordToken)
router.post("/resetPasswordToken/:token", passwordTokenCheck)
router.post("/logout", logoutHandler);

module.exports = router;
