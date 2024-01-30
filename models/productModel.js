const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    color: {
      type: String,
      enum: ["green", "blue", "red"],
    },
    quantity: {
      type: Number,
      default: 1,
    },
    brand: {
      type: String,
      enum: ["apple", "google", "gechno", "samsung", "gionee", "tecno"],
      lowercase: true,
    },
    unit: String,
    imageURL: [],
    ratings: [
      {
        stars: Number,
        comment: String,
        postedBy: mongoose.Schema.Types.ObjectId,
      },
    ],
    actualRating: Number,
    category: {
      type: String,
    },
    sold: {
      type: Number,
      default: 1
    }
  },
  
  { timestamps: true }
);

const productModel = mongoose.model("product", ProductSchema);
module.exports = productModel;
