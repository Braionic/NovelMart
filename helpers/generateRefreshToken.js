const jwt = require("jsonwebtoken");

const generateRefreshToken = async (userId) => {
  try {
    const refreshToken = await jwt.sign(
      { id: userId },
      process.env.SECRETE_KEY,
      { expiresIn: process.env.REFRESH_TOKEN }
    );
    if (!refreshToken) {
      console.log(refreshToken);
    } else {
      console.log(refreshToken);
      return refreshToken;
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports = generateRefreshToken;
