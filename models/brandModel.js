const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const brandModel = mongoose.model("Brand", brandSchema);

module.exports = brandModel;
