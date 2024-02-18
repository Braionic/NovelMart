const mongoose = require("mongoose");

const colorSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
    unique: true,
  },
});

const colorModel = mongoose.model("color", colorSchema);

module.exports = colorModel;
