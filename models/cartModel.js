const mongoose = require("mongoose");

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
      },
      color: String,
      price: Number,
      count: Number,
    },
  ],
  subTotal: Number,
  priceAfterDiscount: Number,

  orderBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
}, {timestamps: true});

//Export the model
module.exports = mongoose.model("cart", userSchema);
