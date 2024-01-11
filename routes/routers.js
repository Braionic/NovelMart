const express = require("express");
const signupController = require("../controllers/userSignUpController");
const signinController = require("../controllers/signinController");
const allUsers = require("../controllers/allUsers");
const user = require("../controllers/user");
const updateUser = require("../controllers/updateUser");
const blockUser = require("../controllers/blockUser");
const router = express.Router();
const { authMiddleWare, isAdmin } = require("../helpers/middlewares");
const unblockUser = require("../controllers/unblockUser");
const deleteUser = require("../controllers/deleteUser");
const refreshController = require("../controllers/refreshController");
const logoutHandler = require("../controllers/userController");

router.get("/", (req, res) => {
  res.json("this is now the home");
});
router.post("/signup", signupController);
router.post("/adminSignup", signupController);
router.post("/signin", signinController);
router.post('/refresh', refreshController)
router.get("/all-users", authMiddleWare, isAdmin, allUsers);
router.get("/user/:id", authMiddleWare, user);
router.patch("/updateUser/:id", authMiddleWare, updateUser);
router.patch("/blockUser/:id", authMiddleWare, isAdmin, blockUser);
router.patch("/unblockUser/:id", authMiddleWare, isAdmin, unblockUser);
router.delete("/deleteUser/:id", authMiddleWare, isAdmin, deleteUser);
router.post('/logout', logoutHandler)


module.exports = router;
