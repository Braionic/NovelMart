const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const tagModel = mongoose.model("Tag", tagSchema);

module.exports = tagModel;
