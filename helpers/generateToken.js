const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
  const token = jwt.sign({ id: userId }, process.env.SECRETE_KEY, {
    algorithm: "HS256",
    expiresIn: process.env.ACCESS_TOKEN_LIFE,
  });
  return token;
};
module.exports = generateToken;
