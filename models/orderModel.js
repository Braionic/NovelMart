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
    default: "On Hold",
    enum: ["Cash on Delivery", "Processing", "Completed", "On Hold"]
   
},
  orderBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
}, {timestamps: true});

//Export the model
module.exports = mongoose.model("order", orderSchema);
