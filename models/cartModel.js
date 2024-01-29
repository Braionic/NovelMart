const mongoose = require("mongoose"); // Erase if already required

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
    ref: "user",
  },
}, {timestamps: true});

//Export the model
module.exports = mongoose.model("cart", userSchema);
