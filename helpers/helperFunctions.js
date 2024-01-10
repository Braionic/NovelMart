const { isValidObjectId } = require("mongoose");

const isIdValid = (userId) => {
  console.log({ msg: userId, msg2: "testing" });
  const isValid = isValidObjectId(userId);
  if (!isValid) {
    return isValid
  }
};
module.exports = isIdValid