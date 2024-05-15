const { mongoose } = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
    },
    wishList: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
      },
    ],
    cart: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
      },
    ],
    role: {
      type: String,
      default: "user",
    },
    address: String,

    isBlocked: {
      type: Boolean,
      default: false,
    },
    refreshToken: {
      type: String,
      default: "",
    },
    passwordLastModified: {
      type: Date,
    },
    resetPasswordToken: String,
    passwordTokenExpiration: Date,
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    console.log("false it wasn't modified")
    return next();
  }
  console.log(this.password);
  //const salt = await bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password, 10);
  return next();
});

userSchema.methods.isPasswordMatched = function (password) {
  const compareResult = bcrypt.compareSync(password, this.password);
  return compareResult;
};
userSchema.methods.generateToken = async function () {
  const token = crypto.randomBytes(20).toString("hex");
  this.passwordTokenExpiration = Date.now() + 10 * 60 * 1000;
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
  console.log(this.resetPasswordToken, "here i am");
  return token;
};
//Export the model
module.exports = mongoose.model("User", userSchema);
