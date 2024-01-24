const mongoose = require("mongoose");
const couponSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  discount: { type: Number, required: true },
  expires: {
    type: Date,
    required: true,
  },
});

const CouponModel = mongoose.model('coupon', couponSchema)

module.exports = CouponModel