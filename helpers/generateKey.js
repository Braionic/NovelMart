const crypto = require("crypto");

function gencode() {
  const gencode = crypto.randomBytes(20).toString("hex");
  console.log(gencode)
}
module.exports = gencode;
