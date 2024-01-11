const userModel = require("../models/userModel");

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
res.clearCookie("refreshToken", {httpOnly: true})
  } catch (error) {
    console.log(error)
  }
  res.sendStatus(403)
};

module.exports = logoutHandler;
