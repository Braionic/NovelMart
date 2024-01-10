const { mongoose } = require("mongoose");
const bcrypt = require("bcryptjs");

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
    role: {
      type: String,
      default: "user",
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  console.log(this.password);
  //const salt = await bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password, 10);
  return next();
});

userSchema.methods.isPasswordMatched = function (password) {
  const compareResult = bcrypt.compareSync(password, this.password);
  return compareResult;
};
//Export the model
module.exports = mongoose.model("User", userSchema);
