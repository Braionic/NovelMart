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
    color: [],
    quantity: {
      type: Number,
      default: 1,
    },
    brand: {
      type: String,
      lowercase: true,
    },
    unit: String,
    images: [{
      res: String,
      public_id: String,
      asset_id: String
    }],
    tags: [],
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
      default: 0
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
