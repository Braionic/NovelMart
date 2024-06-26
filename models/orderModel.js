const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var orderSchema = new mongoose.Schema({
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
  paymentIntent: {},
orderStatus: {
    type: String,
    default: "Not Processed",
    enum: ["Cash on Delivery","Not Processed", "Processing", "Completed", "Dispatched", "On Hold"]
},
  orderBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
}, {timestamps: true});

//Export the model
module.exports = mongoose.model("order", orderSchema);
